import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import DropDown from './DropDown'

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
      <div>
        <form onSubmit={this.onFormSubmit}>
          <DropDown
            name='sourceType'
            value={this.state.fields.sourceType}
            defaultOptionName={optionName}
            options={sourceTypes}
            onChange={this.onInputChange}
          />
          <br />
          <Field
            placeholder='Title'
            name='sourceTitle'
            value={this.state.fields.sourceTitle}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Title Required')}
          />
          <br />
          {{
            SAVING: <input value='Saving...' type='submit' disabled />,
            SUCCESS: <input value='Saved!' type='submit' disabled />,
            ERROR: <input
              value='Save Failed - Retry?'
              type='submit'
              disabled={this.validate()}
            />,
            READY: <input
              value='Submit'
              type='submit'
              disabled={this.validate()}
            />,
          }[status]}
        </form>
      </div>
    )
  }
}

export default SourceInput
