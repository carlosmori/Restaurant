import {all, call, put, takeLatest} from 'redux-saga/effects'
import {FETCH_TABLE, FETCH_ORDER_MENU, TAKE_ORDER, UPDATE_TABLE} from './types'
import {axios} from '../../../utils/http/axios-singleton'
import {TABLE_STATUS_VALUE} from '../../../utils/enums/tableStatusEnum'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'
export function* fetchTables() {
  try {
    const response = yield call(fetchTableHttpCall)
    //tables
    const tables = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: FETCH_TABLE.SUCCESS, payload: {tables}})
  } catch (error) {
    // dispatch a failure action to the store with the error
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
const fetchTableHttpCall = () => axios.get(`/tables`)
const fecthOrderMenuHttpCall = () => axios.get(`/products`)
const takeOrderHttpCall = order => axios.post('/orders', {...order})

/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(FETCH_TABLE.REQUEST, fetchTables),
    takeLatest(FETCH_ORDER_MENU.REQUEST, fetchOrderMenu),
    takeLatest(TAKE_ORDER.REQUEST, takeOrder),
  ])
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
