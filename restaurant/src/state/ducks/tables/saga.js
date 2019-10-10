/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  TABLES_TEST_ACTION,
  TABLES_TEST_ACTION_FAILED,
  TABLES_TEST_ACTION_SUCCESS,
  FETCH_TABLE,
  FETCH_ORDER_MENU,
} from './types'
import {axios} from '../../../utils/http/axios-singleton'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter TABLES testSaga')
    yield put({type: TABLES_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: TABLES_TEST_ACTION_FAILED, error})
  }
}
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
    takeLatest(TABLES_TEST_ACTION, testSaga),
    takeLatest(FETCH_TABLE.REQUEST, fetchTables),
    takeLatest(FETCH_ORDER_MENU.REQUEST, fetchOrderMenu),
  ])
}
