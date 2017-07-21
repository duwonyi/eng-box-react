import SentenceList from './SentenceList'
import React from 'react'
import { shallow } from 'enzyme'
import { Table } from 'reactstrap'

describe('SentenceList', () => {
  it('should have a table', () => {
    const wrapper = shallow(
      <SentenceList sentences={[]} isLoading={false}/>
    )
    expect(
      wrapper.find(Table).length
    ).toBe(1)
  })
})
