import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import SourceSelect from './SourceSelect'
import { Form, FormGroup, Label, } from 'reactstrap'

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
        <h2>Add sentence</h2>
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup>
            <Label for='fieldSentence'>Sentence</Label>
            <Field
              id='fieldSentence'
              placeholder='Sentence'
              name='sentence'
              value={this.state.fields.sentence}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Sentence Required')}
            />
          </FormGroup>
          <FormGroup>
            <Label for='selectSourceType'>Source Type</Label>
            <SourceSelect
              id='selectSourceType'
              sourceType={this.state.fields.sourceType}
              source={this.state.fields.source}
              selected={this.state.fields.selected}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='fieldSourceDetail'>Source Detail</Label>
            <Field
              placeholder='Source detail'
              name='detail'
              value={this.state.fields.detail}
              onChange={this.onInputChange}
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

export default SentenceInput
