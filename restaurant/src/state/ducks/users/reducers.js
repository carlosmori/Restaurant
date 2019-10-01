import {FETCH_USER, UPDATE_USER, DELETE_USER, ADD_USER} from './types'
const initialState = {
  userList: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER.SUCCESS:
      return {
        ...state,
        userList: payload.users,
      }
    case UPDATE_USER.SUCCESS:
      let {userList} = state
      const oldUserIndex = userList.findIndex(user => user.id === payload.id)
      userList[oldUserIndex] = payload
      return {
        ...state,
        userList: [...userList],
      }
    case DELETE_USER.SUCCESS:
      return {
        ...state,
        userList: [...state.userList].filter(user => user.id !== payload),
      }
    case ADD_USER.SUCCESS:
      return {
        ...state,
        userList: [...state.userList, payload],
      }
    default:
      return state
  }
}
