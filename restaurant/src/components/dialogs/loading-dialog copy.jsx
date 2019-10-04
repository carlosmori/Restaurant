import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
  },
}))

const LoadingDialog = props => {
  const handleClose = () => {}
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
    }

    const timer = setInterval(tick, 20)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <CircularProgress variant="determinate" value={progress} />
      {/* <Fade in={open}>
        <div className={classes.paper}>
        </div>
      </Fade> */}
    </Modal>
  )
}

export default LoadingDialog
