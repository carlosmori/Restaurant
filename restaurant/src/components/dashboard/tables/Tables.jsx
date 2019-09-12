import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import logoPattern from '../../../assets/wood-pattern.png'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
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
  gridContainer: {
    height: '100%',
  },
  gridBlock: {
    position: 'relative',
  },
  subtitleContainer: {
    position: 'absolute',
    width: '35px',
    height: '35px',
    lineHeight: '35px',
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '50%',
  },
  subtitle: {
    margin: 0,
    fontSize: '20px',
  },
  fabContainer: {
    textAlign: 'center',
    marginTop: '-8%',
  },
}))
export default function Tables() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} className={classes.gridBlock}>
          <Paper className={classes.paper}>
            <div className={classes.subtitleContainer}>
              <p className={classes.subtitle}>#1</p>
            </div>
            <div></div>
          </Paper>
          <div className={classes.fabContainer}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridBlock}>
          <Paper className={classes.paper}>
            <div className={classes.subtitleContainer}>
              <p className={classes.subtitle}>#2</p>
            </div>
            <div></div>
          </Paper>
          <div className={classes.fabContainer}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridBlock}>
          <Paper className={classes.paper}>
            <div className={classes.subtitleContainer}>
              <p className={classes.subtitle}>#3</p>
            </div>
            <div></div>
          </Paper>
          <div className={classes.fabContainer}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridBlock}>
          <Paper className={classes.paper}>
            <div className={classes.subtitleContainer}>
              <p className={classes.subtitle}>#4</p>
            </div>
            <div></div>
          </Paper>
          <div className={classes.fabContainer}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
