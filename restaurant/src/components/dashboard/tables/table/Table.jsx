import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import logoPattern from '../../../../assets/wood-pattern.png'
import {connect} from 'react-redux'
import {toggleModal} from '../../../../state/ducks/order-menu/actions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {TABLE_STATUS_KEY, TABLE_STATUS_VALUE} from '../../../../utils/enums/tableStatusEnum'
import Timer from '../../../timer/Timer'
import moment from 'moment'
import {ORDER_STATUS_VALUE} from '../../../../utils/enums/orderStatusEnum'
import {deliverOrder, closeTable} from '../../../../state/ducks/tables/actions'
const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '60%',
    width: '60%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 10px 20px 5px #00000082',
    position: 'relative',
    backgroundColor: '#6e4e26',
    backgroundImage: `url(${logoPattern})`,
  },
  gridBlock: {
    position: 'relative',
  },
  subtitleContainer: {
    position: 'absolute',
    color: 'white',
    zIndex: '1',
  },
  subtitle: {
    margin: '10px 10px',
    fontSize: '15px',
  },
  fabContainer: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  fab: {
    width: '35px',
    height: '35px',
    margin: '10px 10px',
  },
  status: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '-2px 10px 10px rgba(0, 0, 0, 0.87)',
  },
}))
export const Table = ({toggleModal, table, deliverOrder, index, closeTable}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const tableMenuClick = () => {
    let id, tableId
    if (table.currentOrder) {
      id = table.currentOrder.id
      tableId = table.id
    }
    
    switch (table.status) {
      case TABLE_STATUS_VALUE.FREE:
        toggleModal({isOrderMenuModalToggled: true, tableId: table.id})
        break
      case TABLE_STATUS_VALUE.CLIENTS_WAITING:
        deliverOrder({id, status: ORDER_STATUS_VALUE.DELIVERED, tableId})
        break
      case TABLE_STATUS_VALUE.CLIENTS_EATING:
        closeTable({tableId})
        break
    }
    setAnchorEl(null)
  }
  const handleTableActionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const shouldDisplayTimer = () => {
    if (table.currentOrder) {
      const then = moment(new Date(table.currentOrder.deliver_time)).valueOf()
      const now = moment().valueOf()
      const futureDeliverBy = then - now > 0
      return table.status === TABLE_STATUS_VALUE.CLIENTS_WAITING && futureDeliverBy
    } else {
      return false
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} className={classes.gridBlock} key={index}>
        <div className={classes.subtitleContainer}>
          <p className={classes.subtitle}>Table #{table.id}</p>
        </div>
        <Paper className={classes.paper}>
          <div className={classes.status}>{TABLE_STATUS_KEY[table.status]}</div>
          {shouldDisplayTimer() ? <Timer deliverBy={table.currentOrder.deliver_time} /> : null}
          <div className={classes.fabContainer}>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleTableActionsClick}>
              <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" />
            </Fab>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {table.status === TABLE_STATUS_VALUE.FREE ? (
                <MenuItem onClick={tableMenuClick}>Take Order</MenuItem>
              ) : null}
              {table.status === TABLE_STATUS_VALUE.CLIENTS_WAITING ? (
                <div>
                  <MenuItem
                    disabled={table.currentOrder.status !== ORDER_STATUS_VALUE.READY_TO_DELIVER}
                    onClick={tableMenuClick}
                  >
                    Deliver Order
                  </MenuItem>
                  <MenuItem onClick={tableMenuClick} disabled={true}>
                    Cancel Order
                  </MenuItem>
                </div>
              ) : null}
              {table.status === TABLE_STATUS_VALUE.CLIENTS_EATING ? (
                <MenuItem onClick={tableMenuClick}>Close Table</MenuItem>
              ) : null}
            </Menu>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}
const mapStateToProps = state => ({})
export default connect(
  mapStateToProps,
  {
    toggleModal,
    deliverOrder,
    closeTable,
  }
)(Table)
