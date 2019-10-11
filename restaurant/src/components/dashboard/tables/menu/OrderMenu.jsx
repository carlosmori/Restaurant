import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import ListItemText from '@material-ui/core/ListItemText'
import {connect} from 'react-redux'
import {toggleModal} from '../../../../state/ducks/order-menu/actions'
import { takeOrder} from '../../../../state/ducks/orders/actions'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
  },
  paper: {
    width: '30%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonsContainer: {
    display: 'flex',
    marginTop: '2%',
    justifyContent: 'space-between',
  },
  button: {
    width: '49%',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  orderDetails: {
    fontSize: '1rem',
  },
  orderDetailsBlock: {},
  orderDetailsBlockValue: {
    float: 'right',
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const OrderMenu = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(props.open)
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [orderTotalAmount, setOrderTotalAmount] = React.useState(0)
  const [orderEstimatedCookTime, setOrderEstimatedCookTime] = React.useState(0)

  React.useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  React.useEffect(() => {
    setOrderTotalAmount(
      selectedProducts.reduce(
        (total, currentProduct) => (total += currentProduct.price),
        0
      )
    )
    setOrderEstimatedCookTime(
      selectedProducts.reduce(
        (total, currentProduct) => (total += currentProduct.cook_time_minutes),
        0
      )
    )
  }, [selectedProducts])

  const takeOrder = () => {
    const order = {
      amount: orderTotalAmount,
      cook_time: orderEstimatedCookTime,
      table_id: props.tableId,
      products: selectedProducts.map(product => product.id),
    }
    handleClose()
    props.takeOrder(order)
  }
  const handleClose = () => {
    props.toggleModal({isOrderMenuModalToggled: false, tableId: undefined})
    setSelectedProducts([])
  }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title" className={classes.title}>
            Make your order
          </h2>
          <form className={classes.container} noValidate autoComplete="off">
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="select-multiple-chip">Products</InputLabel>
              <Select
                multiple
                value={selectedProducts}
                onChange={event => setSelectedProducts(event.target.value)}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value.id}
                        label={value.description}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {props.products.map(product => (
                  <MenuItem key={product.id} value={product}>
                    <Checkbox
                      checked={
                        selectedProducts.findIndex(
                          element => element.description === product.description
                        ) > -1
                      }
                    />
                    <ListItemText primary={product.description + ` $` + product.price} />{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.orderDetails}>
              <p className={classes.orderDetailsBlock}>
                Estimated Time:{' '}
                <span className={classes.orderDetailsBlockValue}>
                  {orderEstimatedCookTime !== 0
                    ? `${orderEstimatedCookTime} Minutes`
                    : `-`}
                </span>
              </p>
              <p className={classes.orderDetailsBlock}>
                Order Total:{' '}
                <span className={classes.orderDetailsBlockValue}>
                  {orderTotalAmount !== 0 ? `USD ${orderTotalAmount}` : `-`}
                </span>
              </p>
            </div>
            <div className={classes.buttonsContainer}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={orderTotalAmount === 0 || orderEstimatedCookTime === 0}
                onClick={takeOrder}
                className={classes.button}
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  )
}
const mapStateToProps = state => ({
  products: state.tables.productsList,
  tableId: state.orderMenu.currentTableId,
})
export default connect(
  mapStateToProps,
  {
    toggleModal,
    takeOrder,
  }
)(OrderMenu)
