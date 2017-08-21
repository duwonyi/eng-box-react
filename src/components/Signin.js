import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Field from './Field'
import { Form, FormGroup, Label, Button, } from 'reactstrap'

class Signin extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSignin: PropTypes.func.isRequired,
  }

  state = {
    email: this.props.email || '',
    password: this.props.password || '',
    fieldErrors: {},
  }

  componentWillReceiveProps(update) {
    this.setState({
      email: update.email,
      password: update.password,
    })
  }

  onFormSubmit = evt => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    evt.preventDefault()

    if (this.validate()) return

    this.props.onSignin(user)
  }

  onInputChange = ({ name, value, error }) => {
    const fieldErrors = this.state.fieldErrors
    fieldErrors[name] = error

    this.setState({ [name]: value, fieldErrors })
  }

  validate = () => {
    const email = this.state.email
    const password = this.state.password
    const fieldErrors = this.state.fieldErrors
    const errMessage = Object.keys(fieldErrors).filter(k => fieldErrors[k])

    if (!email) return true
    if (!password) return true
    if (errMessage.length) return true
  }

  redirectPath = () => {
    const locationState = this.props.location.state
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    )
    return pathname || '/'
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <Redirect to={this.redirectPath()} />
      )
    }

    return (
      <div className='container'>
        <Form
          className='form-signin'
          onSubmit={this.onFormSubmit}
        >
          <h2 className='form-signin-heading'>Sign in</h2>
          <FormGroup>
            <Label
              for='fieldEmail'
              className='sr-only'
            >
              Email
            </Label>
            <Field
              id='fieldEmail'
              type='email'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.onInputChange}
              validate={val => val ? false: 'Email Required'}
            />
            <Label
              for='fieldPassword'
              className='sr-only'
            >
              Password
            </Label>
            <Field
              id='fieldPassword'
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onInputChange}
              validate={val => val ? false: 'Password Required'}
            />
          </FormGroup>
          <Button
           color='success'
           size='lg'
           block
          >
            Sign in
          </Button>
        </Form>
      </div>
    )
  }
}

export default Signin
