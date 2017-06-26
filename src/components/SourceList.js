import React from 'react'
import PropTypes from 'prop-types'

const SourceList = ({sources, isLoading}) => (
  <div>
    {isLoading ? (
      <img alt='loading' src='/img/loading.gif' />
    ) : (
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {
            sources.map(source => (
              <tr
                key={source._id}
              >
                <td>{source.type}</td>
                <td>{source.title}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )}
  </div>
)

SourceList.propTypes = {
  sources: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default SourceList
