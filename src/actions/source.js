import apiClient from '../api/apiClient'
import { delay } from '../lib/util'
import * as types from '../constants/ActionTypes'
import { changeSaveStatus } from './common'

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
      delay(1000, () => {
        dispatch(changeSaveStatus('READY'))
      })
    })
    .catch((err) => {
      dispatch(addsourceFailure(err))
    })
}
