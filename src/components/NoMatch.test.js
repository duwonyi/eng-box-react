import NoMatch from './NoMatch'
import React from 'react'
import { shallow } from 'enzyme'

describe('App', () => {
  it('should have div', () => {
    const wrapper = shallow(
      <NoMatch />
    )
    expect(
      wrapper.find('div').length
    ).toBe(1)
  })
})
