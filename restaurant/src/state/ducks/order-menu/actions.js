import {MODAL_TOGGLE, DISPATCH_ORDER} from './types'

//With payload
export const toggleModal = payload => ({
  type: MODAL_TOGGLE,
  payload,
})
export const dispatchOrder = payload => ({
  type: DISPATCH_ORDER.REQUEST,
  payload,
})
