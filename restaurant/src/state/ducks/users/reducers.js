import {FETCH_USER} from './types'
const initialState = {
  UsersState: {
    userList: [],
  },
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER.SUCCESS:
      return {
        ...state,
        userList: payload.users,
      }
    default:
      return state
  }
}
