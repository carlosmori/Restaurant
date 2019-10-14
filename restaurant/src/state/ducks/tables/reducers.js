import {FETCH_TABLE, FETCH_ORDER_MENU, UPDATE_TABLE, TAKE_ORDER} from './types'
const initialState = {
  tablesList: [],
  productsList: [],
}

export default (state = initialState, {type, payload}) => {
  let currentOrder, newTableList, tableStatus, tableIndex, updatedTable
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
      currentOrder = payload.currentOrder
      tableStatus = payload.tableStatus
      const newTablesList = [...state.tablesList]
      tableIndex = newTablesList.findIndex(table => table.id === currentOrder.tableId)
      updatedTable = {...newTablesList[tableIndex]}
      updatedTable.status = tableStatus
      updatedTable.currentOrder = currentOrder
      newTablesList[tableIndex] = updatedTable
      return {
        ...state,
        tablesList: [...newTablesList],
      }
    case TAKE_ORDER.SUCCESS:
      currentOrder = payload
      const newTableList = [...state.tablesList]
      tableIndex = newTableList.findIndex(table => table.id === currentOrder.tableId)
      updatedTable = {...newTableList[tableIndex]}
      updatedTable.currentOrder = currentOrder
      newTableList[tableIndex] = updatedTable
      return {
        ...state,
        tablesList: [...newTableList],
      }
    default:
      return state
  }
}
