import React, {useEffect} from 'react'
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
import {TABLE_STATUS_KEY} from '../../../../utils/enums/tableStatusEnum'
import Timer from '../../../timer/Timer'
import moment from 'moment'

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
    // borderRadius: '50%',
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
export const Table = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [status, setStatus] = React.useState('Available')
  const classes = useStyles()

  const takeOrder = () => {
    setAnchorEl(null)
    props.toggleModal({isOrderMenuModalToggled: true, tableId: props.table.id})
  }
  const serveOrder = () => {
    setStatus('Clients Eating')
    setAnchorEl(null)
  }
  const handleTableActionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const shouldDisplayTimer = () => {
    //@todo refactor status == 2 and if else
    //Display timer only if the deliverByDate is greater than the current date and the status is Clients Waiting
    if (props.table.currentOrder) {
      const then = moment(new Date(props.table.currentOrder.deliver_time)).valueOf()
      const now = moment().valueOf()
      const futureDeliverBy = then - now > 0
      return props.table.status === 2 && futureDeliverBy
    } else {
      return false
    }
  }
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} className={classes.gridBlock} key={props.index}>
        <div className={classes.subtitleContainer}>
          <p className={classes.subtitle}>Table #{props.table.id}</p>
        </div>
        <Paper className={classes.paper}>
          <div className={classes.status}>{TABLE_STATUS_KEY[props.table.status]}</div>
          {shouldDisplayTimer() ? (
            <Timer deliverBy={props.table.currentOrder.deliver_time} />
          ) : null}
          <div className={classes.fabContainer}>
            <Fab
              className={classes.fab}
              color="primary"
              aria-label="add"
              onClick={handleTableActionsClick}
            >
              <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" />
            </Fab>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
            >
              {props.table.status === 1 ? (
                <MenuItem onClick={takeOrder}>Take Order</MenuItem>
              ) : null}
              {props.table.status === 2 ? (
                <div>
                  <MenuItem onClick={serveOrder}>Deliver Order</MenuItem>
                  <MenuItem onClick={serveOrder} disabled={true}>
                    Cancel Order
                  </MenuItem>
                </div>
              ) : null}
              {status === 'Clients Eating' ? (
                <MenuItem onClick={serveOrder}>Close Table</MenuItem>
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
  }
)(Table)
