import {DASHBOARD_TEST_ACTION, DASHBOARD_TEST_PLAIN_ACTION} from './types'

//With payload
export const dashboardTestAction = payload => ({
  type: DASHBOARD_TEST_ACTION,
  payload,
})
//Without payload
export const dashboardTestPlainAction = () => ({
  type: DASHBOARD_TEST_PLAIN_ACTION,
})
