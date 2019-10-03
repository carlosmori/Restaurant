import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import logoPattern from '../../../../assets/wood-pattern.png'
import {connect} from 'react-redux'
import {toggleModal} from '../../../../state/ducks/order-menu/actions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {TABLE_STATUS} from '../../../../utils/enums/tableStatusEnum'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '80%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '50%',
    boxShadow: '0px 20px 20px 5px #00000082',
    position: 'relative',
    backgroundColor: '#6e4e26',
    backgroundImage: `url(${logoPattern})`,
  },
  gridBlock: {
    position: 'relative',
  },
  subtitleContainer: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    lineHeight: '30px',
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    top: '10%',
    left: '12%',
    zIndex: '1',
  },
  subtitle: {
    margin: 0,
    fontSize: '15px',
  },
  fabContainer: {
    textAlign: 'center',
    marginTop: '-8%',
  },
  status: {
    color: 'white',
    fontSize: '40px',
    fontWeight: 'bold',
    textShadow: '-2px 10px 10px rgba(0, 0, 0, 0.87)',
  },
}))
export const Table = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [status, setStatus] = React.useState('Available')
  const takeOrder = () => {
    // setStatus(TABLE_STATUS[1])
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
  const classes = useStyles()
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} className={classes.gridBlock} key={props.index}>
        <div className={classes.subtitleContainer}>
          <p className={classes.subtitle}>#{props.table.id}</p>
        </div>
        <Paper className={classes.paper}>
          <div className={classes.status}>{TABLE_STATUS[props.table.status]}</div>
        </Paper>
        <div className={classes.fabContainer}>
          <Fab color="primary" aria-label="add" onClick={handleTableActionsClick}>
            <AddIcon aria-controls="simple-menu" aria-haspopup="true" />
          </Fab>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
            {status === 'Available' ? (
              <MenuItem onClick={takeOrder}>Take Order</MenuItem>
            ) : null}
            {status === 'Clients Waiting' ? (
              <MenuItem onClick={serveOrder}>Serve Order</MenuItem>
            ) : null}
            {status === 'Clients Eating' ? (
              <MenuItem onClick={serveOrder}>Close Table</MenuItem>
            ) : null}
          </Menu>
        </div>
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
