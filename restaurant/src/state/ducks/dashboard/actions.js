import {DASHBOARD_TEST_ACTION, DASHBOARD_TEST_PLAIN_ACTION, SHOW_INFORMATIVE_DIALOG} from './types'

//With payload
export const dashboardTestAction = payload => ({
  type: DASHBOARD_TEST_ACTION,
  payload,
})
export const showInformativeDialog = payload => ({
  type: SHOW_INFORMATIVE_DIALOG,
  payload,
})
//Without payload
export const dashboardTestPlainAction = () => ({
  type: DASHBOARD_TEST_PLAIN_ACTION,
})
