import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import {fetchOrders} from '../../../state/ducks/orders/actions'
import {ORDER_STATUS_KEY} from '../../../utils/enums/orderStatusEnum'
const Orders = ({fetchOrders, orderList}) => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'id', type: 'numeric'},
      {title: 'Table #', field: 'table_id'},
      {title: 'Waiter/Waitress', field: 'waiterWaitressName'},
      {title: 'Detail', field: 'deliver_time'},
      {title: 'Total Amount', field: 'amount'},
      {
        title: 'Status',
        field: 'status',
        render: rowData => <div>{ORDER_STATUS_KEY[rowData.status]}</div>,
      },
    ],
    data: [],
  })
  React.useEffect(() => {
    fetchOrders()
  }, [fetchOrders])
  React.useEffect(() => {
    if (orderList.length) {
      const orderListFormatted = orderList.map(order => {
        const {id, deliver_time, amount, status, waiterWaitress, tableId} = order
        const waiterWaitressName = `${waiterWaitress.name}  ${waiterWaitress.last_name}`
        return {
          id,
          waiterWaitressName,
          deliver_time,
          tableId,
          amount,
          status,
        }
      })
      setState({columns: [...state.columns], data: [...orderListFormatted]})
    } else {
      setState({columns: [...state.columns], data: []})
    }
  }, [orderList, state])

  return (
    <MaterialTable title="Pending Orders" columns={state.columns} data={state.data} />
  )
}
const mapStateToProps = state => ({
  orderList: state.orders.orderList,
})
export default connect(
  mapStateToProps,
  {fetchOrders}
)(Orders)
