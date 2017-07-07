import Header from './Header'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('App', () => {
  it('should have 4 NavLink', () => {
    const wrapper = shallow(
      <Header />
    )
    expect(
      wrapper.find(NavLink).length
    ).toBe(4)
 })
})
