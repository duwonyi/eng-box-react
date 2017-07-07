import Footer from './Footer'
import React from 'react'
import { shallow } from 'enzyme'

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
