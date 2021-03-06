import Header from './Header'
import React from 'react'
import { NavLink } from 'reactstrap'
import { shallow } from 'enzyme'

describe('Header', () => {
  it('should have 4 NavLink', () => {
    const wrapper = shallow(
      <Header />
    )
    expect(
      wrapper.find(NavLink).length
    ).toBe(4)
 })
})
