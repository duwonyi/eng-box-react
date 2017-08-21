import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import DropDown from './DropDown'
import { Form, FormGroup, Label, } from 'reactstrap'

class SourceInput extends Component {

  static propTypes = {
    saveStatus: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    onAddSource: PropTypes.func.isRequired,
  }

  state = {
    fields: this.props.fields || {
      sourceTitle: '',
      sourceType: '',
      createdAt: null,
    },
    fieldErrors: {},
  }

  componentWillReceiveProps(update) {
    this.setState({ fields: update.fields })
  }

  onFormSubmit = evt => {
    const source = {
      title: this.state.fields.sourceTitle,
      type: this.state.fields.sourceType,
      userId: localStorage.getItem('userId'),
    }
    source.createdAt = new Date()

    evt.preventDefault()

    if (this.validate()) return

    this.props.onAddSource(source)
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors

    fields[name] = value
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors })
  }

  validate = () => {
    const source = this.state.fields
    const fieldErrors = this.state.fieldErrors
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])

    if (!source.sourceType) return true
    if (!source.sourceTitle) return true
    if (errMessages.length) return true

    return false
  }

  render() {
    const sourceTypes = [
      {name: 'Book', value: 'book'},
      {name: 'Web', value: 'web'},
      {name: 'Video', value: 'video'},
      {name: 'Own', value: 'own'},
    ]
    const optionName = 'What the type of source?'
    const status = this.props.saveStatus
    return (
      <div className='container'>
        <h2>Add source</h2>
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup>
            <Label for='selectSourceType'>Source Type</Label>
            <DropDown
              id='selectSourceType'
              name='sourceType'
              value={this.state.fields.sourceType}
              defaultOptionName={optionName}
              options={sourceTypes}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='fieldSourceTitle'>Source Title</Label>
            <Field
              placeholder='Title'
              name='sourceTitle'
              value={this.state.fields.sourceTitle}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Title Required')}
            />
          </FormGroup>
          {{
            SAVING: <input className='btn btn-secondary' value='Saving...' type='submit' disabled />,
            SUCCESS: <input className='btn btn-secondary' value='Saved!' type='submit' disabled />,
            ERROR: <input
              className='btn btn-secondary'
              value='Save Failed - Retry?'
              type='submit'
              disabled={this.validate()}
            />,
            READY: <input
              className='btn btn-secondary'
              value='Submit'
              type='submit'
              disabled={this.validate()}
            />,
          }[status]}
        </Form>
      </div>
    )
  }
}

export default SourceInput
