import {REPORTS_TEST_ACTION, REPORTS_TEST_PLAIN_ACTION} from './types'

//With payload
export const reportsTestAction = payload => ({
  type: REPORTS_TEST_ACTION,
  payload,
})
//Without payload
export const reportsTestPlainAction = () => ({
  type: REPORTS_TEST_PLAIN_ACTION,
})
