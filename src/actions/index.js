import apiClient from '../api/apiClient'
import * as types from '../constants/ActionTypes'

const receiveSentences = (sentences) => ({
  type: types.RECEIVE_SENTENCES,
  sentences
})

export const fetchSentences = () => (dispatch, getState) => {
  if (!getState().sentences.isFetched) {
    apiClient.loadSenetences()
      .then((sentences) => {
        dispatch(receiveSentences(sentences))
      })
  }
}

const addSentenceSuccess = (sentence) => ({
  type: types.ADD_SENTENCE,
  sentence,
})

export const addSentence = (sentence, cbSuccess, cbError) => (dispatch) => {
  apiClient.saveSentence(sentence)
    .then((newSentence) => {
      sentence._id = newSentence._id
      dispatch(addSentenceSuccess(sentence))
      cbSuccess()
    })
    .catch((err) => {
      cbError()
    })
}

const receiveSources = (sources) => ({
  type: types.RECEIVE_SOURCES,
  sources
})

export const fetchSources = () => (dispatch, getState) => {
  if (getState().sources.items.length === 0) {
    apiClient.getSources()
      .then(sources => {
        dispatch(receiveSources(sources))
      })
  }
}

export const addSource = (source, cbSuccess, cbError) => (dispatch) => {
  apiClient.saveSource(source)
    .then(newSource => {
      source._id = newSource._id
      dispatch(addSourceSuccess(source))
      cbSuccess()
    })
    .catch((err) => {
      cbError()
    })
}

const addSourceSuccess = (source) => ({
  type: types.ADD_SOURCE,
  source
})
