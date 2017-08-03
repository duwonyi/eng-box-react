import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import { Form, Button } from 'reactstrap'

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

    if(this.validate()) return

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

  render() {
    return (
      <div>
        <Form inline onSubmit={this.onFormSubmit}>
          <Field
            type='email'
            placeholder='Email'
            name='email'
            value={this.state.email}
            onChange={this.onInputChange}
            validate={val => val ? false: 'Email Required'}
          />
          <Field
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.onInputChange}
            validate={val => val ? false: 'Password Required'}
          />
          <Button outline color="success">Sign in</Button>
        </Form>
      </div>
    )
  }
}

export default Signin
