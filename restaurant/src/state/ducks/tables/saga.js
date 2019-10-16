import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  FETCH_TABLE,
  FETCH_ORDER_MENU,
  TAKE_ORDER,
  DELIVER_ORDER,
  CLOSE_TABLE,
  CANCEL_ORDER,
  UPDATE_ORDER,
} from './types'
import {axios} from '../../../utils/http/axios-singleton'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'
import {TABLE_STATUS_VALUE} from '../../../utils/enums/tableStatusEnum'
import moment from 'moment'

export function* fetchTables() {
  try {
    const response = yield call(fetchTableHttpCall)
    const tables = response.data
    yield put({type: FETCH_TABLE.SUCCESS, payload: {tables}})
  } catch (error) {
    yield put({type: FETCH_TABLE.FAILED, error})
  }
}
export function* fetchOrderMenu() {
  try {
    const response = yield call(fecthOrderMenuHttpCall)
    const products = response.data
    yield put({type: FETCH_ORDER_MENU.SUCCESS, payload: {products}})
  } catch (error) {
    yield put({type: FETCH_ORDER_MENU.FAILED, error})
  }
}

export function* takeOrder(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(takeOrderHttpCall, action.payload)
    yield put({
      type: TAKE_ORDER.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'Order dispatched successfully', variant: 'success'},
    })
  } catch (error) {
    yield put({type: TAKE_ORDER.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}

export function* cancelOrder(action) {
  const {currentOrder, orderId} = action.payload
  const {tableId, deliver_time} = currentOrder
  const then = moment(new Date(deliver_time)).valueOf()
  const now = moment().valueOf()
  if (then - now < 0) {
  }
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(cancelOrderHttpCall, {tableId, orderId})
    yield put({
      type: CANCEL_ORDER.SUCCESS,
      payload: {tableId},
    })
    yield put({
      type: UPDATE_ORDER.REQUEST,
      payload: {afterDeliverTime: true, id: orderId},
    })

    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {
        show: true,
        message: 'Order cancelled successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: CANCEL_ORDER.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* deliverOrder(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(deliverOrderHttpCall, action.payload)
    yield put({
      type: DELIVER_ORDER.SUCCESS,
      payload: response.data,
    })

    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {
        show: true,
        message: 'Order delivered successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: DELIVER_ORDER.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* closeTable(action) {
  const {tableId} = action.payload.currentOrder
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    yield call(closeTableHttpCall, {
      id: tableId,
      status: TABLE_STATUS_VALUE.FREE,
      order_id: null,
    })
    yield put({
      type: CLOSE_TABLE.SUCCESS,
      payload: {tableId},
    })

    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {
        show: true,
        message: 'Table closed successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: CLOSE_TABLE.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* updateOrder(action) {
  try {
    yield call(updateOrderHttpCall, action.payload)
    yield put({
      type: UPDATE_ORDER.SUCCESS,
    })
  } catch (error) {
    yield put({type: UPDATE_ORDER.FAILED, payload: {error}})
  }
}
const fetchTableHttpCall = () => axios.get(`/tables`)
const fecthOrderMenuHttpCall = () => axios.get(`/products`)
const takeOrderHttpCall = order => axios.post('/orders', {...order})
const cancelOrderHttpCall = payload => axios.post('orders/cancelOrder', {...payload})
const deliverOrderHttpCall = payload => axios.post('orders/deliverOrder', {...payload})
const closeTableHttpCall = payload => axios.put(`/tables`, payload)
const updateOrderHttpCall = payload => axios.put(`/orders`, payload)

export default function* root() {
  yield all([
    takeLatest(FETCH_TABLE.REQUEST, fetchTables),
    takeLatest(FETCH_ORDER_MENU.REQUEST, fetchOrderMenu),
    takeLatest(TAKE_ORDER.REQUEST, takeOrder),
    takeLatest(CANCEL_ORDER.REQUEST, cancelOrder),
    takeLatest(DELIVER_ORDER.REQUEST, deliverOrder),
    takeLatest(CLOSE_TABLE.REQUEST, closeTable),
    takeLatest(UPDATE_ORDER.REQUEST, updateOrder),
  ])
}
