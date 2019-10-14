import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'

import {FETCH_ORDERS, DELIVER_ORDER} from './types'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'

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

const fetchOrdersHttpCall = () => axios.get(`/orders/pendingOrders`)
const deliverOrderHttpCall = payload => axios.post('orders/deliverOrder', {...payload})

export default function* root() {
  yield all([
    takeLatest(FETCH_ORDERS.REQUEST, fetchOrders),
    takeLatest(DELIVER_ORDER.REQUEST, deliverOrder),
  ])
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
