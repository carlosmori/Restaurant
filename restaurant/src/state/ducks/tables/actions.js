import {TABLES_TEST_ACTION, TABLES_TEST_PLAIN_ACTION, FETCH_TABLE, FETCH_ORDER_MENU, UPDATE_TABLE} from './types'

//With payload
export const tablesTestAction = payload => ({
  type: TABLES_TEST_ACTION,
  payload,
})
//Without payload
export const tablesTestPlainAction = () => ({
  type: TABLES_TEST_PLAIN_ACTION,
})
export const fetchTables = () => ({
  type: FETCH_TABLE.REQUEST,
})

//With payload
export const fetchOrderMenu = payload => ({
  type: FETCH_ORDER_MENU.REQUEST,
  payload,
})
//With payload
export const updateTable = payload => ({
  type: UPDATE_TABLE,
  payload,
})
