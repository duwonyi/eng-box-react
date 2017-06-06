import React from 'react'

const SentenceList = ({sentences}) => (
  <table>
    <thead>
      <tr>
        <th>Sentence</th>
        <th>CreatedAt</th>
      </tr>
    </thead>
    <tbody>
      {
        sentences.map((sentence, index) => (
          <tr
            key={index}
          >
            <td>{sentence.sentence}</td>
            <td>{sentence.createdAt.toLocaleString()}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default SentenceList
