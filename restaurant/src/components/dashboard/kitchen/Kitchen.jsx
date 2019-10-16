import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {fetchPendingDishes, dispatchProduct, dispatchOrder, cancelProduct} from '../../../state/ducks/kitchen/actions'
import {cancelOrder} from '../../../state/ducks/tables/actions'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import {ORDER_STATUS_VALUE} from '../../../utils/enums/orderStatusEnum'

const getModalStyle = () => {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
const Kitchen = ({dispatchProduct, fetchPendingDishes, pendingOrders, dispatchOrder, cancelProduct, cancelOrder}) => {
  const [open, setOpen] = React.useState(false)
  const [rowData, setRowData] = React.useState({})
  const [message, setMessage] = React.useState('')
  const [action, setAction] = React.useState(null)
  const [modalStyle] = React.useState(getModalStyle)
  const classes = useStyles()
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'orderId', type: 'numeric'},
      {title: 'Description', field: 'description'},
      {title: 'Deliver By', field: 'deliverBy'},
      {
        render: rowData => (
          <div>
            <Button variant="contained" color="primary" onClick={() => kitchenActions(rowData, 'Dispatch')}>
              Dispatch
            </Button>
            <Button variant="contained" color="secondary" onClick={() => kitchenActions(rowData, 'Cancel')}>
              Cancel
            </Button>
          </div>
        ),
      },
    ],
    data: [],
  })

  const toggleModal = flag => {
    setOpen(flag)
  }
  const kitchenActions = (rowData, action) => {
    setOpen(true)
    setAction(action)
    switch (action) {
      case 'Dispatch':
        setMessage('Are you sure you want to dispatch the product?')
        break
      case 'Cancel':
        setMessage('Are you sure you want to cancel the product?')
        break
      default:
        break
    }
    if (rowData) setRowData(rowData)
  }
  const confirm = () => {
    const {orderId, productId} = rowData
    const orderIndex = pendingOrders.findIndex(order => order.id === orderId)
    switch (action) {
      case 'Dispatch':
        const dispatchedProducts = pendingOrders[orderIndex].products
          .filter(product => product.id !== productId)
          .filter(product => !product.order_product.cancelled)
        debugger
        const areAllProductsDispatched = dispatchedProducts.map(product => product.order_product.dispatched)
        if (areAllProductsDispatched.every(dispatched => !!dispatched)) {
          dispatchOrder({id: orderId, status: ORDER_STATUS_VALUE.READY_TO_DELIVER, productId})
        } else {
          dispatchProduct({orderId, productId})
        }
        break
      case 'Cancel':
        const cancelledProducts = pendingOrders[orderIndex].products.filter(product => product.id !== productId)
        const areAllProductsCancelled = cancelledProducts.map(product => product.order_product.cancelled)
        if (areAllProductsCancelled.every(cancelled => !!cancelled)) {
          cancelOrder({orderId, tableId: pendingOrders[orderIndex].tableId})
        }
        cancelProduct({orderId, productId})
        break
      default:
        break
    }
    toggleModal(false)
    setRowData({})
  }
  React.useEffect(() => {
    fetchPendingDishes()
  }, [fetchPendingDishes])
  React.useEffect(() => {
    if (pendingOrders.length > 0) {
      const orderProducts = []
      pendingOrders.forEach(order => {
        if (order.products.length > 0)
          order.products
            .filter(product => !product.order_product.dispatched)
            .filter(product => !product.order_product.cancelled)
            .map(product =>
              orderProducts.push({
                orderId: order.id,
                deliverBy: order.deliver_time,
                description: product.description,
                productId: product.id,
              })
            )
      })
      setState({columns: [...state.columns], data: orderProducts})
    }
  }, [pendingOrders])

  return (
    <div>
      <MaterialTable
        title="Pending Dishes"
        columns={state.columns}
        data={state.data}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => toggleModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{message}</h2>
          <div>
            <Button variant="contained" color="primary" onClick={() => confirm()}>
              {action}
            </Button>
            <Button variant="contained" color="secondary" onClick={() => toggleModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
const mapStateToProps = state => ({
  pendingOrders: state.kitchen.pendingOrders,
})
export default connect(
  mapStateToProps,
  {
    fetchPendingDishes,
    dispatchProduct,
    dispatchOrder,
    cancelProduct,
    cancelOrder,
  }
)(Kitchen)
