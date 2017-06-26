import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSentence, fetchSentences } from '../actions'
import SentenceList from '../components/SentenceList'
import SentenceInput from '../components/SentenceInput'

class SentencePage extends Component {
  componentDidMount() {
    const { dispatch, fetchSentences } = this.props
    dispatch(fetchSentences())
  }

  render() {
    const {
      sentences,
      addSentence,
      isLoading,
      saveStatus,
      fields,
    } = this.props
    return (
      <div>
        <SentenceList
          sentences={sentences}
          isLoading={isLoading}
        />
        <SentenceInput
          onAddSentence={addSentence}
          saveStatus={saveStatus}
          fields={fields}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sentences: state.sentences.items,
  isLoading: state.common.isLoading,
  saveStatus: state.common.saveStatus,
  fields: state.common.fields,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  addSentence: sentence => {
    dispatch(addSentence(sentence))
  },
  fetchSentences,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SentencePage)
