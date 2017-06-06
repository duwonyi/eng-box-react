import React, { Component } from 'react'
import Field from './Field'

class SentenceInput extends Component {
  state = {
    fields: {
      sentence: '',
      createdAt: null,
    },
    fieldErrors: {},
    _saveStatus: 'READY',
  }

  onFormSubmit = (evt) => {
    const sentence = this.state.fields
    sentence.createdAt = new Date()

    evt.preventDefault()

    if (this.validate()) return

    this.setState({ _saveStatus: 'SAVING' })

    this.props.onAddSentence(sentence, () => {
      this.setState({
        fields: {
          sentence: '',
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

  validate = () => {
    const sentence = this.state.fields
    const fieldErrors = this.state.fieldErrors
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])

    if (!sentence.sentence) return true
    if (errMessages.length) return true

    return false
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Sentence'
            name='sentence'
            value={this.state.fields.sentence}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Sentece Required')}
          />
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

export default SentenceInput
