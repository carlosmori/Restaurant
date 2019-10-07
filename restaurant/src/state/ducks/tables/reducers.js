import {FETCH_TABLE, FETCH_ORDER_MENU, UPDATE_TABLE} from './types'
const initialState = {
  tablesList: [],
  productsList: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TABLE.SUCCESS:
      return {
        ...state,
        tablesList: payload.tables,
      }
    case FETCH_ORDER_MENU.SUCCESS:
      return {
        ...state,
        productsList: payload.products,
      }
    case UPDATE_TABLE:
      let {tablesList} = state
      const tableIndex = tablesList.findIndex(table => table.id === payload.tableId)
      tablesList[tableIndex] = {
        ...state.tablesList[tableIndex],
        status: payload.status,
        currentOrder: payload,
      }
      return {
        ...state,
        tablesList: [...tablesList],
      }
    default:
      return state
  }
}
