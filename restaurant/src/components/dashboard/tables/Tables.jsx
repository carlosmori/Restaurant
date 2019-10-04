import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {
  fetchTables,
  fetchOrderMenu,
  updateTable,
} from '../../../state/ducks/tables/actions'
import {showInformativeDialog} from '../../../state/ducks/dashboard/actions'
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
export const Tables = props => {
  React.useEffect(() => {
    if (props.newOrder) {
      props.updateTable(props.newOrder)
      //props.showInformativeDialog(true)
    }
  }, [props.newOrder])
  useEffect(() => {
    props.fetchTables()
    return () => {}
  }, [props.fetchTables])
  useEffect(() => {
    props.fetchOrderMenu()
    return () => {}
  }, [props.fetchOrderMenu])
  useEffect(() => {
    return () => {}
  }, [props.isOrderMenuModalToggled])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        {props.tables.map((value, index) => {
          return <Table table={value} index={index} key={value.id} />
        })}
      </Grid>
      <OrderMenu open={props.isOrderMenuModalToggled} />
    </div>
  )
}
const mapStateToProps = state => ({
  tables: state.tables.tablesList,
  isOrderMenuModalToggled: state.orderMenu.isOrderMenuModalToggled,
  newOrder: state.orderMenu.currentOrderHttp.success,
})
export default connect(
  mapStateToProps,
  {
    fetchTables,
    fetchOrderMenu,
    updateTable,
    showInformativeDialog,
  }
)(Tables)
