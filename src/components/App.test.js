import App from './App'
import React from 'react'
import { shallow } from 'enzyme'

describe('App', () => {
  it('should have 2 divs', () =>{
    const wrapper = shallow(
      <App />
    )
    expect(
      wrapper.find('div').length
    ).toBe(2)
  })
})
