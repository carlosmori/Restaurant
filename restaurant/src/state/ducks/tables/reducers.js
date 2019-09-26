import {FETCH_TABLE} from './types'
const initialState = {
  tablesList: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TABLE.SUCCESS:
      return {
        ...state,
        tablesList: payload.tables,
      }
    default:
      return state
  }
}
