import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {fetchTables, fetchOrderMenu} from '../../../state/ducks/tables/actions'
import Table from './table/Table'
import OrderMenu from './menu/OrderMenu'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  gridContainer: {
    height: '100%',
  },
}))
export const Tables = ({fetchTables, fetchOrderMenu, isOrderMenuModalToggled, tables}) => {
  useEffect(() => {
    fetchTables()
    return () => {}
  }, [fetchTables])
  useEffect(() => {
    fetchOrderMenu()
    return () => {}
  }, [fetchOrderMenu])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        {tables.map((value, index) => (
          <Table table={value} index={index} key={value.id} />
        ))}
      </Grid>
      <OrderMenu open={isOrderMenuModalToggled} />
    </div>
  )
}
const mapStateToProps = state => ({
  tables: state.tables.tablesList,
  isOrderMenuModalToggled: state.orderMenu.isOrderMenuModalToggled,
})
export default connect(
  mapStateToProps,
  {
    fetchTables,
    fetchOrderMenu,
  }
)(Tables)
