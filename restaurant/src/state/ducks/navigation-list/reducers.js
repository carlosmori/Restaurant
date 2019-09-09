import * as types from './types'
const initialState = {
  currentTab: '',
}

const navigationListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DASHBOARD_TITLE:
      return { ...state, currentTab: payload }
    default:
      return state
  }
}
//destruct action
export default navigationListReducer
