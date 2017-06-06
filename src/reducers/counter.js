import * as types from '../constants/ActionTypes'

const counter = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return state = state + 1
    case types.DECREMENT:
      return state = state - 1
    default:
      return state
  }
}
export default counter
