import {USERS_TEST_ACTION, USERS_TEST_PLAIN_ACTION} from './types'

//With payload
export const usersTestAction = payload => ({
  type: USERS_TEST_ACTION,
  payload,
})
//Without payload
export const usersTestPlainAction = () => ({
  type: USERS_TEST_PLAIN_ACTION,
})
