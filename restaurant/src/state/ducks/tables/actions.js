import {TABLES_TEST_ACTION, TABLES_TEST_PLAIN_ACTION, FETCH_TABLE} from './types'

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
