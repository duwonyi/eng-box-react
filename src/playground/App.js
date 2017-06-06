import React, { Component } from 'react'
import SentenceList from '../components/SentenceList'
import SentenceInput from '../components/SentenceInput'
import apiClient from '../api/apiClient'

class App extends Component {
  state = {
    sentences : [],
    _loading: false,
  }

  componentWillMount() {
    this.setState({ _loading: true })
    apiClient.loadSenetences()
      .then((sentences) => {
        this.setState({ sentences: sentences, _loading: false })
      })
  }

  handleAddSentence = (newSentence, cbSuccess, cbError) => {
    const sentences = this.state.sentences.concat(newSentence)
    apiClient.saveSentence(newSentence)
      .then(() => {
        this.setState({ sentences })
        cbSuccess()
      })
      .catch((err) => {
        cbError()
      })
  }

  render() {
    if (this.state._loading) {
      return <img alt='loading' src='/img/loading.gif' />
    }

    return (
      <div>
        <SentenceList sentences={this.state.sentences} />
        <SentenceInput onAddSentence={this.handleAddSentence} />
      </div>
    )
  }
}

export default App
