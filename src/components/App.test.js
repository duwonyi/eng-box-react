import App from './App'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  it('should have 2 divs', () => {
    const wrapper = shallow(
      <App />
    )
    expect(
      wrapper.find('div').length
    ).toBe(2)
  })
})
