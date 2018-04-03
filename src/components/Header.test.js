import Header from './Header'
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { NavLink } from 'reactstrap'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('Header', () => {
  it('should have 4 NavLink', () => {
    const mockStore = configureStore([])
    const store = mockStore({})
    const wrapper = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    expect(
      wrapper.find(Header).length
    ).toBe(1)
 })
})
