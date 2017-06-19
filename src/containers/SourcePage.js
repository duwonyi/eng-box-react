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
    const { sources, addSource } = this.props
    return (
      <div>
        <SourceList sources={sources} />
        <SourceInput onAddSource={addSource} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sources: state.sources.items
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addSource: (source, cbSuccess, cbError) => {
    dispatch(addSource(source, cbSuccess, cbError))
  },
  fetchSources
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourcePage)
