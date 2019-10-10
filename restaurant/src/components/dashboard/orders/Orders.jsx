import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {fetchOrders, deliverOrder} from '../../../state/ducks/orders/actions'
import {ORDER_STATUS_KEY, ORDER_STATUS_VALUE} from '../../../utils/enums/orderStatusEnum'
const Orders = props => {
  //@todo strong type column and field names
  const deliverOrder = order => {
    props.deliverOrder({id: order.id, status: ORDER_STATUS_VALUE.DELIVERED})
  }
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'id', type: 'numeric'},
      {title: 'Waiter/Waitress', field: 'waiterWaitressName'},
      {title: 'Detail', field: 'deliver_time'},
      {title: 'Total Amount', field: 'amount'},
      {
        title: 'Status',
        field: 'status',
        render: rowData => <div>{ORDER_STATUS_KEY[rowData.status]}</div>,
      },
      {
        title: 'Actions',
        render: rowData => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deliverOrder(rowData)}
              disabled={rowData.status != 2}
            >
              Deliver
            </Button>
          </div>
        ),
      },
    ],
    data: [],
  })
  React.useEffect(() => {
    props.fetchOrders()
  }, [props.fetchOrders])
  React.useEffect(() => {
    if (props.orderList.length) {
      const orderListFormatted = props.orderList.map(order => {
        const {id, deliver_time, amount, status, waiterWaitress} = order
        const waiterWaitressName = `${waiterWaitress.name}  ${waiterWaitress.last_name}`
        return {
          id,
          waiterWaitressName,
          deliver_time,
          amount,
          status,
        }
      })
      setState({columns: [...state.columns], data: [...orderListFormatted]})
    }
  }, [props.orderList])

  return (
    <MaterialTable title="Pending Orders" columns={state.columns} data={state.data} />
  )
}
const mapStateToProps = state => ({
  orderList: state.orders.orderList,
})
export default connect(
  mapStateToProps,
  {fetchOrders, deliverOrder}
)(Orders)
