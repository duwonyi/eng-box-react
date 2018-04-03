import Footer from './Footer'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
  it('should have 1 div', () => {
    const wrapper = shallow(
      <Footer />
    )
    expect(
      wrapper.find('div').length
    ).toBe(1)
  })
})
