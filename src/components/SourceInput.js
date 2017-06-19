import React, { Component } from 'react'
import Field from './Field'

class SourceInput extends Component {
  state = {
    fields: {
      title: '',
      type: '',
      createdAt: null,
    },
    fieldErrors: {},
    _saveStatus: 'READY',
  }

  onFormSubmit = evt => {
    const source = {
      title: this.state.fields.title,
      type: this.state.fields.type,
    }
    source.createdAt = new Date()

    evt.preventDefault()

    if (this.validate()) return

    this.setState({ _saveStatus: 'SAVING' })

    this.props.onAddSource(source, () => {
      this.setState({
        fields: {
          title: '',
          type: '',
          createdAt: null,
        },
        _saveStatus: 'SUCCESS'
      })
    }, () => {
      this.setState({ _saveStatus: 'ERROR' })
    })
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors

    fields[name] = value
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors, _saveStatus: 'READY' })
  }

  onSelectType = evt => {
    const type = evt.target.value

    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors

    fields['type'] = type
    this.setState({ fields, fieldErrors, _saveStatus: 'READY' })
  }

  validate = () => {
    const source = this.state.fields
    const fieldErrors = this.state.fieldErrors
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])

    if (!source.type) return true
    if (!source.title) return true
    if (errMessages.length) return true

    return false
  }

  capitalizeFirstLetter = (str) => (
    str.charAt(0).toUpperCase() + str.slice(1)
  )

  render() {
    const types = ['book', 'web', 'video', 'own']
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <select
            onChange={this.onSelectType}
            value={this.state.fields.type || ''}
          >
            <option value=''>
              Which the type of source?
            </option>
            {
              types.map((type, index) => (
                <option value={type} key={index}>
                  {this.capitalizeFirstLetter(type)}
                </option>
              ))
            }
          </select>
          <br />
          <Field
            placeholder='Title'
            name='title'
            value={this.state.fields.title}
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
          }[this.state._saveStatus]}
        </form>
      </div>
    )
  }
}

export default SourceInput
