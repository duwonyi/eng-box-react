import React, { Component } from 'react'
import Field from './Field'
import SourceSelect from './SourceSelect'

class SentenceInput extends Component {
  state = {
    fields: {
      sentence: '',
      createdAt: null,
      source: null,
      sourceType: null,
      selected: null,
      detail: '',
    },
    fieldErrors: {},
    _saveStatus: 'READY',
  }

  onFormSubmit = (evt) => {
    const sentence = {
      sentence: this.state.fields.sentence,
      source: this.state.fields.selected,
      detail: this.state.fields.detail,
    }
    sentence.createdAt = new Date()

    evt.preventDefault()

    if (this.validate()) return

    this.setState({ _saveStatus: 'SAVING' })

    this.props.onAddSentence(sentence, () => {
      this.setState({
        fields: {
          sentence: '',
          createdAt: null,
          source: null,
          selected: null,
          detail: '',
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
    if (!sentence.sourceType) return true
    if (!sentence.source) return true
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
          <br />
          <SourceSelect
            sourceType={this.state.fields.sourceType}
            source={this.state.fields.source}
            selected={this.state.fields.selected}
            onChange={this.onInputChange}
          />
          <br />
          <Field
            placeholder='Source detail'
            name='detail'
            value={this.state.fields.detail}
            onChange={this.onInputChange}
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

export default SentenceInput
