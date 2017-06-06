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
    const { sentences, addSentence } = this.props
    return (
      <div>
        <SentenceList sentences={sentences} />
        <SentenceInput onAddSentence={addSentence} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sentences: state.sentences.items
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addSentence: (sentence, cbSuccess, cbError) => {
    dispatch(addSentence(sentence, cbSuccess, cbError))
  },
  fetchSentences
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentencePage)
