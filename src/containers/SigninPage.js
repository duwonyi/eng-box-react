import React from 'react'
import { connect } from 'react-redux'
import { signin } from '../actions/auth'
import Signin from '../components/Signin'

const SigninPage = ({isAuthenticated, email, password, signin, location}) => (
  <Signin
    isAuthenticated={isAuthenticated}
    email={email}
    password={password}
    onSignin={signin}
    location={location}
  />
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  email: state.auth.email,
  password: state.auth.password,
})

const mapDispatchToProps = dispatch => ({
  signin: creds => {
    dispatch(signin(creds))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninPage)
