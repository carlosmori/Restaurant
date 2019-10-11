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
      const {currentOrder, tableStatus} = payload
      let newTablesList = [...state.tablesList]
      const tableIndex = newTablesList.findIndex(
        table => table.id === currentOrder.tableId
      )
      let updatedTable = {...newTablesList[tableIndex]}
      updatedTable.status = tableStatus
      updatedTable.currentOrder = currentOrder
      newTablesList[tableIndex] = updatedTable
      return {
        ...state,
        tablesList: [...newTablesList],
      }
    default:
      return state
  }
}
