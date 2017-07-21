import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

const SentenceList = ({sentences, isLoading}) => (
  <div className='container'>
    <h2 className='mt-4'>Sentences</h2>
    {isLoading ? (
      <img alt='loading' src='/img/loading.gif' />
    ) : (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Sentence</th>
            <th>Detail</th>
            <th>Source</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {
            sentences.map((sentence, index) => (
              <tr
                key={index}
              >
                <th scope='row'>{index + 1}</th>
                <td>{sentence.sentence}</td>
                <td>{sentence.detail}</td>
                <td>{sentence.source.title}</td>
                <td>{sentence.createdAt.toLocaleString()}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )}
  </div>
)

SentenceList.propTypes = {
  sentences: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default SentenceList
