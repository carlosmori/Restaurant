import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {updateOrder} from '../../state/ducks/tables/actions'
const useStyles = makeStyles(theme => ({
  '@keyframes blink': {
    '0%': {opacity: 0.5},
    '50%': {opacity: 1},
    '100%': {opacity: 0.5},
  },
  status: {
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    textShadow: '-2px 10px 10px rgba(0, 0, 0, 0.87)',
  },
  timer: {
    fontSize: '15px',
    width: 'fit-content',
    margin: '0px auto 10px',
    color: 'white',
    fontWeight: 'bold',
  },
  warningMessage: {
    animation: '$blink 2500ms infinite',
    color: 'white',
  },
}))
const Timer = ({deliverBy, updateOrder, orderId}) => {
  const classes = useStyles()
  const [minutes, setMinutes] = React.useState(undefined)
  const [seconds, setSeconds] = React.useState(undefined)
  const [orderRunningLate, setOrderRunningLate] = React.useState(false)
  let id

  React.useEffect(() => {
    const then = moment(new Date(deliverBy)).valueOf()
    const now = moment().valueOf()
    const futureDeliverBy = then - now > 0
    if (futureDeliverBy) {
      id = setInterval(() => {
        const updatedNow = moment().valueOf()
        const duration = moment.duration(then - updatedNow, 'milliseconds')
        const minutes = duration.minutes()
        const seconds = duration.seconds()
        if (minutes === 0 && seconds === 0) {
          clearInterval(id)
          setOrderRunningLate(true)
          updateOrder({afterDeliverTime: true, id: orderId})
        }
        setMinutes(minutes)
        setSeconds(seconds)
      }, 1000)
    } else {
      setOrderRunningLate(true)
      updateOrder({afterDeliverTime: true, id: orderId})
    }
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <div className={classes.timer}>
      {orderRunningLate ? (
        <div className={classes.warningMessage}>Order running late</div>
      ) : (
        <div>
          {seconds !== undefined ? (
            `${minutes < 10 ? `0` + minutes : minutes}:
        ${seconds < 10 ? `0` + seconds : seconds}`
          ) : (
            <CircularProgress size={15} thickness={5} variant="indeterminate" />
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = () => ({})
export default connect(
  mapStateToProps,
  {updateOrder}
)(Timer)
