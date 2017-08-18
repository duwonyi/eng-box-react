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
    .then(user => {
      localStorage.setItem('token', user.token)
      localStorage.setItem('userId', user.userId)
      dispatch(signinSuccess())
    })
    .catch(err => {
      console.log(err)
      dispatch(signinFailure(err))
    })
}

export const logout = () => ({
  type: types.LOGOUT
})

const signupRequest = () => ({
  type: types.SIGNUP_REQUEST
})

const signupSuccess = () => ({
  type: types.SIGNUP_SUCCESS
})

const signupFailure = () => ({
  type: types.SIGNUP_FAILURE
})

export const signup = newUser => dispatch => {
  dispatch(signupRequest())
  apiClient.signup(newUser)
    .then(user => {
      localStorage.setItem('token', user.token)
      localStorage.setItem('userId', user.userId)
      dispatch(signupSuccess())
    })
    .catch(err => {
      dispatch(signupFailure(err))
    })
}
