import apiClient from '../api/apiClient'
import * as types from '../constants/ActionTypes'

const changeSaveStatus = status => ({
  type: types.CHANGE_SAVE_STATUS,
  status
})

const delayAction = (timeout, cb)  => {
  setTimeout(() => cb(), timeout)
}

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
      delayAction(1000, () => {
        dispatch(changeSaveStatus('READY'))
      })
    })
    .catch((err) => {
      dispatch(addSentenceFailure(err))
    })
}

const requestSources = () => ({
  type: types.SOURCES_REQUEST
})

const receiveSources = sources => ({
  type: types.SOURCES_SUCCESS,
  sources
})

const fetchSourcesFailure = error => ({
  type: types.SOURCES_FAILURE,
  error
})

export const fetchSources = () => (dispatch, getState) => {
  if (getState().sources.items.length === 0) {
    dispatch(requestSources())
    apiClient.getSources()
      .then(sources => {
        dispatch(receiveSources(sources))
      })
      .catch(err => {
        dispatch(fetchSourcesFailure(err))
      })
  }
}

const addSourceRequest = () => ({
  type: types.ADD_SOURCE_REQUEST
})

const addSourceSuccess = source => ({
  type: types.ADD_SOURCE_SUCCESS,
  source
})

const addsourceFailure = error => ({
  type: types.ADD_SOURCE_FAILURE,
  error
})

export const addSource = source => dispatch => {
  dispatch(addSourceRequest())
  apiClient.saveSource(source)
    .then(newSource => {
      source._id = newSource._id
      dispatch(addSourceSuccess(source))
      delayAction(1000, () => {
        dispatch(changeSaveStatus('READY'))
      })
    })
    .catch((err) => {
      dispatch(addsourceFailure(err))
    })
}
