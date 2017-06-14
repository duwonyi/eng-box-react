import React, { Component } from 'react'
import PropTypes from 'prop-types'
import apiClient from './../api/apiClient'

class SourceSelect extends Component {
  static propTypes = {
    sourceType : PropTypes.string,
    source: PropTypes.string,
    selected: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    sourceType: null,
    source: null,
    sources: [],
    selected: null,
    _loading: false,
  }

  componentWillReceiveProps(update) {
    this.setState({
      sourceType: update.sourceType,
      source: update.source,
      selected: update.selected
    })
  }

  onSelectSourceType = (evt) => {
    const sourceType = evt.target.value
    const source = null
    this.setState({sourceType, source})
    this.props.onChange({name: 'sourceType', value: sourceType})
    this.props.onChange({name: 'source', value: source})
    if(sourceType) this.fetchSources(sourceType)
  }

  onSelectSource = (evt) => {
    const source = evt.target.value
    const selected = this.state.sources.find(v => (
      v._id === source
    ))
    this.setState({source, selected})
    this.props.onChange({name: 'source', value: source})
    this.props.onChange({name: 'selected', value: selected})
  }

  fetchSources = (sourceType) => {
    this.setState({_loading: true, sources: []})
    apiClient.getSources(sourceType).then(sources => (
      this.setState({_loading: false, sources: sources})
    ))
  }

  renderSourceTypeSelect = () => {
    const types = ['book', 'web', 'video', 'own']
    return (
      <select
        onChange={this.onSelectSourceType}
        value={this.state.sourceType || ''}
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
    )
  }

  renderSourceSelect = () => {
    if (this.state._loading) {
      return <img alt='loading' src='/img/loading.gif' />
    }
    if (!this.state.sourceType || !this.state.sources.length) {
      return <span />
    }
    return (
      <select
        onChange={this.onSelectSource}
        value={this.state.source || ''}
      >
        { [
          <option value='' key='source-none'>
            Which source?
          </option>,
          ...this.state.sources.map((source, index) => (
            <option value={source._id} key={source._id}>
              {source.title}
            </option>
          ))
        ] }
      </select>
    )
  }

  capitalizeFirstLetter = (str) => (
    str.charAt(0).toUpperCase() + str.slice(1)
  )

  render() {
    return (
      <div>
        {this.renderSourceTypeSelect()}
        <br />
        {this.renderSourceSelect()}
      </div>
    )
  }
}

export default SourceSelect
