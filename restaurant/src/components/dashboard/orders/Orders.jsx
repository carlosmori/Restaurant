import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import {fetchOrders} from '../../../state/ducks/orders/actions'
const Orders = props => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'id', type: 'numeric'},
      {title: 'Waiter/Waitress', field: 'waiterWaitressName'},
      {title: 'Detail', field: 'deliver_time'},
      {title: 'Total Amount', field: 'amount'},
      {title: 'Status', field: 'status'},
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
    <MaterialTable
      title="Pending Orders"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.push(newData)
              setState({...state, data})
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data[data.indexOf(oldData)] = newData
              setState({...state, data})
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const data = [...state.data]
              data.splice(data.indexOf(oldData), 1)
              setState({...state, data})
            }, 600)
          }),
      }}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  )
}
const mapStateToProps = state => ({
  orderList: state.orders.orderList,
})
export default connect(
  mapStateToProps,
  {fetchOrders}
)(Orders)
