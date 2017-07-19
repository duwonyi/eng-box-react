import SentenceList from './SentenceList'
import React from 'react'
import { shallow } from 'enzyme'

describe('SentenceList', () => {
  it('should have a table', () => {
    const wrapper = shallow(
      <SentenceList sentences={[]} isLoading={false}/>
    )
    expect(
      wrapper.find('table').length
    ).toBe(1)
  })
})
