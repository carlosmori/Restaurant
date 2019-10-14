import {all, call, put, takeLatest} from 'redux-saga/effects'
import {FETCH_TABLE, FETCH_ORDER_MENU} from './types'
import {axios} from '../../../utils/http/axios-singleton'

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
const fetchTableHttpCall = () => axios.get(`/tables`)
const fecthOrderMenuHttpCall = () => axios.get(`/products`)

/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(FETCH_TABLE.REQUEST, fetchTables),
    takeLatest(FETCH_ORDER_MENU.REQUEST, fetchOrderMenu),
  ])
}
