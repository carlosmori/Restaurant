import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {fetchTables} from '../../../state/ducks/tables/actions'
import Table from './table/Table'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  gridContainer: {
    height: '100%',
  },
}))
export const Tables = props => {
  useEffect(() => {
    props.fetchTables()
    return () => {}
  }, [])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        {props.tables.map((value, index) => {
          return <Table value={value} index={index} key={value.id} />
        })}
      </Grid>
    </div>
  )
}
const mapStateToProps = state => ({
  tables: state.tables.tablesList,
})
export default connect(
  mapStateToProps,
  {
    fetchTables,
  }
)(Tables)
