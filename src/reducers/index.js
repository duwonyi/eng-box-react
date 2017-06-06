import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import counter from './counter'

const sentences = (state = {
  items: [],
  isFetched: false
}, action) => {
  switch (action.type) {
    case types.RECEIVE_SENTENCES:
      return {
        ...state,
        items: state.items.concat(action.sentences),
        isFetched: true
      }
    case types.ADD_SENTENCE:
      return {
        ...state,
        items: [...state.items, action.sentence]
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sentences,
  counter
})

export default rootReducer
