import {FETCH_TABLE, FETCH_ORDER_MENU} from './types'
import {DISPATCH_ORDER} from '../order-menu/types'
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
    case DISPATCH_ORDER.SUCCESS:
      let {tablesList} = state
      const tableIndex = tablesList.findIndex(table => table.id === payload.tableId)
      tablesList[tableIndex] = {...state.tablesList[tableIndex], status: payload.status}
      return {
        ...state,
        tablesList: [...tablesList],
      }
    default:
      return state
  }
}
