import {MODAL_TOGGLE, TAKE_ORDER} from './types'

//With payload
export const toggleModal = payload => ({
  type: MODAL_TOGGLE,
  payload,
})
export const takeOrder = payload => ({
  type: TAKE_ORDER.REQUEST,
  payload,
})
