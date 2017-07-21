import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

const SourceList = ({sources, isLoading}) => (
  <div className='container'>
    <h2 className='mt-4'>Sources</h2>
    {isLoading ? (
      <img alt='loading' src='/img/loading.gif' />
    ) : (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {
            sources.map((source, index) => (
              <tr
                key={source._id}
              >
                <th scope='row'>{index + 1}</th>
                <td>{source.type}</td>
                <td>{source.title}</td>
                <td>{source.createdAt.toLocaleString()}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )}
  </div>
)

SourceList.propTypes = {
  sources: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default SourceList
