import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import SourceSelect from './SourceSelect'

class SentenceInput extends Component {

  static propTypes = {
    saveStatus: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    onAddSentence: PropTypes.func.isRequired,
  }

  state = {
    fields: this.props.fields || {
      sentence: '',
      detail: '',
      source: null,
      sourceType: null,
      selected: null,
      createdAt: null,
    },
    fieldErrors: {},
  }

  componentWillReceiveProps(update) {
    this.setState({ fields: update.fields })
  }

  onFormSubmit = evt => {
    const sentence = {
      sentence: this.state.fields.sentence,
      source: this.state.fields.selected,
      detail: this.state.fields.detail,
    }
    sentence.createdAt = new Date()

    evt.preventDefault()

    if (this.validate()) return

    this.props.onAddSentence(sentence)
  }

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors

    fields[name] = value
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors })
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
    const status = this.props.saveStatus
    return (
      <div className='container'>
        <h2>Add Sentence</h2>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Sentence'
            name='sentence'
            value={this.state.fields.sentence}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Sentence Required')}
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
          }[status]}
        </form>
      </div>
    )
  }
}

export default SentenceInput
