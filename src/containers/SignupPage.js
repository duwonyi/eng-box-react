import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import Signup from '../components/Singup'

const SignupPage = ({email, password, passwordCfm, signup}) => (
  <div>
    <Signup
      email={email}
      password={password}
      passwordCfm={passwordCfm}
      onSignup={signup}
    />
  </div>
)

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  passwordCfm: state.auth.passwordCfm,
})

const mapDispatchToProps = dispatch => ({
  signup: newUser => {
    dispatch(signup(newUser))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage)
