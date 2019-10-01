import {
  USERS_TEST_ACTION,
  USERS_TEST_PLAIN_ACTION,
  FETCH_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
} from './types'

//With payload
export const usersTestAction = payload => ({
  type: USERS_TEST_ACTION,
  payload,
})
//With payload
export const updateUser = payload => ({
  type: UPDATE_USER.REQUEST,
  payload,
})
export const addUser = payload => ({
  type: ADD_USER.REQUEST,
  payload,
})
export const deleteUser = payload => ({
  type: DELETE_USER.REQUEST,
  payload,
})
//With payload
export const fetchUsers = () => ({
  type: FETCH_USER.REQUEST,
})
//Without payload
export const usersTestPlainAction = () => ({
  type: USERS_TEST_PLAIN_ACTION,
})
