import React from 'react'
import PropTypes from 'prop-types'

const SentenceList = ({sentences, isLoading}) => (
  <div>
    {isLoading ? (
      <img alt='loading' src='/img/loading.gif' />
    ) : (
      <table>
        <thead>
          <tr>
            <th>Sentence</th>
            <th>Detail</th>
            <th>CreatedAt</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {
            sentences.map((sentence, index) => (
              <tr
                key={index}
              >
                <td>{sentence.sentence}</td>
                <td>{sentence.detail}</td>
                <td>{sentence.createdAt.toLocaleString()}</td>
                <td>{sentence.source.title}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )}
  </div>
)

SentenceList.propTypes = {
  sentences: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default SentenceList
