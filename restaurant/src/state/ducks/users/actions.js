import {FETCH_USER, UPDATE_USER, DELETE_USER, ADD_USER} from './types'

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
export const fetchUsers = () => ({
  type: FETCH_USER.REQUEST,
})
