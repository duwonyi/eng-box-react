import apiClient from '../api/apiClient'
import { delay } from '../lib/util'
import * as types from '../constants/ActionTypes'
import { changeSaveStatus } from './common'

const requestSentences = () => ({
  type: types.SENTENCES_REQUEST
})

const receiveSentences = sentences => ({
  type: types.SENTENCES_SUCCESS,
  sentences
})

const fetchSentencesFailure = error => ({
  type: types.SENTENCES_FAILURE,
  error
})

export const fetchSentences = () => (dispatch, getState) => {
  if (!getState().sentences.isFetched) {
    dispatch(requestSentences())
    apiClient.loadSenetences()
      .then(sentences => {
        dispatch(receiveSentences(sentences))
      })
      .catch(err => {
        dispatch(fetchSentencesFailure(err))
      })
  }
}

const addSentenceRequest = () => ({
  type: types.ADD_SENTENCE_REQUEST
})

const addSentenceSuccess = sentence => ({
  type: types.ADD_SENTENCE_SUCCESS,
  sentence,
})

const addSentenceFailure = error => ({
  type: types.ADD_SENTENCE_FAILURE,
  error
})

export const addSentence = sentence => dispatch => {
  dispatch(addSentenceRequest())
  apiClient.saveSentence(sentence)
    .then((newSentence) => {
      sentence._id = newSentence._id
      dispatch(addSentenceSuccess(sentence))
      delay(1000, () => {
        dispatch(changeSaveStatus('READY'))
      })
    })
    .catch((err) => {
      dispatch(addSentenceFailure(err))
    })
}
