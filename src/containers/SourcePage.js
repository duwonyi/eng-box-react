import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSources, addSource } from '../actions'
import SourceList from '../components/SourceList'
import SourceInput from '../components/SourceInput'

class SourcePage extends Component {
  componentDidMount() {
    const { dispatch, fetchSources } = this.props
    dispatch(fetchSources())
  }

  render() {
    const {
      sources,
      addSource,
      isLoading,
      saveStatus,
      fields,
    } = this.props
    return (
      <div>
        <SourceList
          sources={sources}
          isLoading={isLoading}
        />
        <SourceInput
          onAddSource={addSource}
          saveStatus={saveStatus}
          fields={fields}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sources: state.sources.items,
  isLoading: state.common.isLoading,
  saveStatus: state.common.saveStatus,
  fields: state.common.fields,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  addSource: source => {
    dispatch(addSource(source))
  },
  fetchSources
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourcePage)
