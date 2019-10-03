import {MODAL_TOGGLE} from './types'
const initialState = {
  isOrderMenuModalToggled: false,
  currentTableId: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case MODAL_TOGGLE:
      return {
        ...state,
        isOrderMenuModalToggled: payload.isOrderMenuModalToggled,
        currentTableId: payload.tableId
      }
    default:
      return state
  }
}
