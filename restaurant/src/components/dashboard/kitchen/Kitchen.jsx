import React from 'react'
import MaterialTable from 'material-table'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {
  fetchPendingDishes,
  dispatchProduct,
  dispatchOrder,
} from '../../../state/ducks/kitchen/actions'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import {ORDER_STATUS_KEY, ORDER_STATUS_VALUE} from '../../../utils/enums/orderStatusEnum'

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
const Kitchen = props => {
  const [state, setState] = React.useState({
    columns: [
      {title: 'Order #', field: 'orderId', type: 'numeric'},
      {title: 'Description', field: 'description'},
      {title: 'Deliver By', field: 'deliverBy'},
      {
        render: rowData => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleModal(true, rowData)}
            >
              Dispatch
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleModal(false)}
            >
              Cancel
            </Button>
          </div>
        ),
      },
    ],
    data: [],
  })
  const [open, setOpen] = React.useState(false)
  const [rowData, setRowData] = React.useState({})
  const [modalStyle] = React.useState(getModalStyle)

  const classes = useStyles()

  const dispatchProduct = rowData => {
    const {orderId, productId} = rowData
    props.dispatchProduct({orderId, productId})
    toggleModal(false)
    setRowData({})
  }
  const toggleModal = (flag, rowData) => {
    setOpen(flag)
    if (rowData) setRowData(rowData)
  }

  React.useEffect(() => {
    props.fetchPendingDishes()
  }, [props.fetchPendingDishes])
  React.useEffect(() => {
    if (props.pendingOrders.length > 0) {
      const orderProducts = []
      props.pendingOrders.forEach(order => {
        const {id} = order
        return order.products.length > 0
          ? order.products.map(product =>
              orderProducts.push({
                orderId: order.id,
                deliverBy: order.deliver_time,
                description: product.description,
                productId: product.id,
              })
            )
          : props.dispatchOrder({id, status: ORDER_STATUS_VALUE.READY_TO_DELIVER})
      })
      setState({columns: [...state.columns], data: orderProducts})
    }
  }, [props.pendingOrders])

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
          <h2 id="simple-modal-title">Are you sure you want to dispatch the product?</h2>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatchProduct(rowData)}
            >
              Dispatch
            </Button>
            {/* @todo allow the user to cancel a product and ask to cancel the entire order, work on styles */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleModal(false)}
            >
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
  }
)(Kitchen)
