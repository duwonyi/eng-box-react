import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import { Form, FormGroup, Label, Button, } from 'reactstrap'

class Signup extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordCfm: PropTypes.string.isRequired,
    onSignup: PropTypes.func.isRequired,
  }

  state = {
    email: this.props.email || '',
    password: this.props.password || '',
    passwordCfm: this.props.passwordCfm || '',
    fieldErrors: {},
  }

  componentWillReceiveProps(update) {
    this.setState({
      email: update.email,
      password: update.password,
      passwordCfm: update.passwordCfm,
    })
  }

  onFormSubmit = evt => {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }

    evt.preventDefault()

    if (this.validate()) return

    this.props.onSignup(newUser)
  }

  onInputChange = ({ name, value, error }) => {
    const fieldErrors = this.state.fieldErrors
    fieldErrors[name] = error

    this.setState({ [name]: value, fieldErrors })
  }

  validate = () => {
    const email = this.state.email
    const password = this.state.password
    const passwordCfm = this.state.passwordCfm
    const fieldErrors = this.state.fieldErrors
    const errMessage = Object.keys(fieldErrors).filter(k => fieldErrors[k])

    if (!email) return true
    if (!password) return true
    if (!passwordCfm) return true
    if (errMessage.length) return true
  }

  render() {
    return (
      <div className='container'>
        <Form
          className='form-signin'
          onSubmit={this.onFormSubmit}
        >
          <h2 className='form-signin-heading'>Sign up</h2>
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
              className='input-signup-pwd'
              id='fieldPassword'
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onInputChange}
              validate={val => val ? false: 'Password Required'}
            />
            <Label
              for='fieldPasswordConfirm'
              className='sr-only'
            >
              Password Confirm
            </Label>
            <Field
              id='fieldPasswordConfirm'
              type='password'
              placeholder='Password Confirm'
              name='passwordCfm'
              value={this.state.passwordCfm}
              onChange={this.onInputChange}
              validate={val => val ? false: 'Password Confirm Required'}
            />
          </FormGroup>
          <Button
           color='info'
           size='lg'
           block
          >
            Sign up
          </Button>
        </Form>
      </div>
    )
  }
}

export default Signup
