import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import counter from './counter'
import auth from './auth'

const common = (state = {
  isLoading: false,
  saveStatus: 'READY',
  fields: {
    sentence: '',
    detail: '',
    sourceTitle: '',
    sourceType: '',
    selected: null,
    createdAt: null,
  }
}, action) => {
  switch (action.type) {
    case types.CHANGE_SAVE_STATUS:
      return {
        ...state,
        saveStatus: action.status
      }
    case types.SENTENCES_REQUEST:
    case types.SOURCES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.SENTENCES_SUCCESS:
    case types.SOURCES_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case types.ADD_SENTENCE_REQUEST:
    case types.ADD_SOURCE_REQUEST:
      return {
        ...state,
        saveStatus: 'SAVING'
      }
    case types.ADD_SENTENCE_SUCCESS:
    case types.ADD_SOURCE_SUCCESS:
      return {
        ...state,
        fields: {
          sentence: '',
          detail: '',
          sourceTitle: '',
          sourceType: '',
          selected: null,
          createdAt: null,
        },
        saveStatus: 'SUCCESS'
      }
    case types.ADD_SENTENCE_FAILURE:
    case types.ADD_SOURCE_FAILURE:
      return {
        ...state,
        saveStatus: 'ERROR'
      }
    default:
    return state
  }
}

const sentences = (state = {
  items: [],
  isFetched: false
}, action) => {
  switch (action.type) {
    case types.SENTENCES_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.sentences),
        isFetched: true
      }
    case types.ADD_SENTENCE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.sentence]
      }
    default:
      return state
  }
}

const sources = (state = {
  items: []
}, action) => {
  switch (action.type) {
    case types.SOURCES_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.sources)
      }
    case types.ADD_SOURCE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.source]
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  common,
  sentences,
  sources,
  counter,
  auth,
})

export default rootReducer
