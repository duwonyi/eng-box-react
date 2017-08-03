import apiClient from '../api/apiClient'
import * as types from '../constants/ActionTypes'

const signinRequest = () => ({
  type: types.SIGNIN_REQUEST
})

const signinSuccess = () => ({
  type: types.SIGNIN_SUCCESS
})

const signinFailure = () => ({
  type: types.SIGNIN_FAILURE
})

export const signin = creds => dispatch => {
  dispatch(signinRequest())
  apiClient.signin(creds)
    .then(token => {
      localStorage.setItem('token', token.token)
      dispatch(signinSuccess())
    })
    .catch(err => {
      dispatch(signinFailure(err))
    })
}

export const logout = () => ({
  type: types.LOGOUT
})
