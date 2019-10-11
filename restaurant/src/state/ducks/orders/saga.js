import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'

import {FETCH_ORDERS, DELIVER_ORDER, TAKE_ORDER} from './types'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'
import {UPDATE_TABLE} from '../tables/types'
import {TABLE_STATUS, TABLE_STATUS_VALUE} from '../../../utils/enums/tableStatusEnum'

export function* fetchOrders() {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(fetchOrdersHttpCall)
    yield timeout(500)
    yield put({
      type: FETCH_ORDERS.SUCCESS,
      payload: {success: response.data},
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
  } catch (error) {
    yield put({type: FETCH_ORDERS.FAILED, payload: {error}})
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
    yield timeout(500)
    //@todo Dispatch order success should modify order reducer, to update the status and allow the user
    //to deliver the order to the table
    yield put({
      type: DELIVER_ORDER.SUCCESS,
      payload: response.data,
    })
    // const response = yield call(deliverOrderHttpCall, action.payload)

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

export function* takeOrder(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(takeOrderHttpCall, action.payload)
    yield timeout(3000)
    yield put({
      type: TAKE_ORDER.SUCCESS,
      payload: response.data,
    })
    yield put({
      type: UPDATE_TABLE,
      payload: {
        currentOrder: response.data,
        tableStatus: TABLE_STATUS_VALUE.CLIENTS_WAITING,
      },
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
const fetchOrdersHttpCall = () => axios.get(`/orders/pendingOrders`)
const deliverOrderHttpCall = payload => axios.put('/orders', {...payload})
const takeOrderHttpCall = order => axios.post('/orders', {...order})

export default function* root() {
  yield all([
    takeLatest(FETCH_ORDERS.REQUEST, fetchOrders),
    takeLatest(DELIVER_ORDER.REQUEST, deliverOrder),
    takeLatest(TAKE_ORDER.REQUEST, takeOrder),
  ])
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
