import SentenceList from './SentenceList'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'
import { Table } from 'reactstrap'

Enzyme.configure({ adapter: new Adapter() })

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
