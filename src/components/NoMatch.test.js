import NoMatch from './NoMatch'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('NoMatch', () => {
  it('should have div', () => {
    const wrapper = shallow(
      <NoMatch />
    )
    expect(
      wrapper.find('div').length
    ).toBe(1)
  })
})
