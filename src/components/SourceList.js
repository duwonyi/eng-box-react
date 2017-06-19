import React from 'react'

const SourceList = ({sources}) => (
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
)

export default SourceList
