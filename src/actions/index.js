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
