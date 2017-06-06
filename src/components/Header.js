import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => (
  <div>
    <h1>English Box</h1>
    <ul>
      <li>
        <NavLink exact to='/'
          className='item'
          activeClassName='active'
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/sentences'
          className='item'
          activeClassName='active'
        >
          Sentences
        </NavLink>
      </li>
      <li>
        <NavLink to='/words'
          className='item'
          activeClassName='active'
        >
          Words
        </NavLink>
      </li>
      <li>
        <NavLink to='/sources'
          className='item'
          activeClassName='active'
        >
          Sources
        </NavLink>
      </li>
    </ul>
  </div>
)

export default Header
