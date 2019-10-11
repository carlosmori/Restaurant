import {MODAL_TOGGLE} from './types'

//With payload
export const toggleModal = payload => ({
  type: MODAL_TOGGLE,
  payload,
})
