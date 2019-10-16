import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import {amber, green} from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import {Snackbar as Snack} from '@material-ui/core/'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import clsx from 'clsx'
import {connect} from 'react-redux'
import {toggleSnackbar} from '../../state/ducks/dashboard/actions'
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Snackbar = props => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  })
  React.useEffect(() => {
    if (props.snackbar.show) {
      setState({...state, open: true})
      setTimeout(() => {
        handleClose()
      }, 2000)
    } else {
      setState({...state, open: false})
    }
    return () => {}
  }, [props.snackbar.show])
  const {vertical, horizontal, open} = state

  const handleClose = () => {
    setState({...state, open: false})
    props.toggleSnackbar({show: false, message: '', variant: ''})
  }

  return (
    <div>
      <Snack
        anchorOrigin={{vertical, horizontal}}
        key={`${vertical},${horizontal}`}
        open={open}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.message}</span>}
      >
        <MySnackbarContentWrapper onClose={handleClose} variant={props.snackbar.variant} message={props.snackbar.message} />
      </Snack>
    </div>
  )
}

const MySnackbarContentWrapper = props => {
  const classes = useStyles1()
  const {message, onClose, variant} = props
  const Icon = variant ? variantIcon[variant] : CheckCircleIcon
  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  )
}
const mapStateToProps = state => ({
  snackbar: state.dashboard.snackbar,
})
export default connect(
  mapStateToProps,
  {toggleSnackbar}
)(Snackbar)
