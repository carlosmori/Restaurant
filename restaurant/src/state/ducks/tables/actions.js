import {TABLES_TEST_ACTION, TABLES_TEST_PLAIN_ACTION} from './types'

//With payload
export const tablesTestAction = payload => ({
  type: TABLES_TEST_ACTION,
  payload,
})
//Without payload
export const tablesTestPlainAction = () => ({
  type: TABLES_TEST_PLAIN_ACTION,
})
