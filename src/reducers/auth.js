import * as types from '../constants/ActionTypes'

const auth = (state = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  email: '',
  password: '',
  passwordCfm: '',
  isSigning: false,
}, action) => {
  switch (action.type) {
    case types.SIGNIN_REQUEST:
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isSigning: true,
      }
    case types.SIGNIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {
        email: '',
        password: '',
        passwordCfm: '',
        isAuthenticated: true,
        isSigning: false,
      }
    case types.SIGNIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isSigning: false,
      }
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export default auth
