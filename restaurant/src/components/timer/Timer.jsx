import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
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
}))
const Timer = props => {
  const classes = useStyles()
  const [minutes, setMinutes] = React.useState(undefined)
  const [seconds, setSeconds] = React.useState(undefined)
  let id

  React.useEffect(() => {
    const then = moment(new Date(props.deliverBy)).valueOf()
    id = setInterval(() => {
      const updatedNow = moment().valueOf()
      const duration = moment.duration(then - updatedNow, 'milliseconds')
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      if (minutes === 0 && seconds === 0) {
        clearInterval(id)
      }
      setMinutes(minutes)
      setSeconds(seconds)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <div className={classes.timer}>
      {seconds !== undefined ? (
        `${minutes < 10 ? `0` + minutes : minutes}:
        ${seconds < 10 ? `0` + seconds : seconds}`
      ) : (
        <CircularProgress size={15} thickness={5} variant="indeterminate" />
      )}
    </div>
  )
}

export default Timer
