import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import '../styles/Header.css'

class Header extends Component {
  state = {
    isOpen: false
  }

  toggle = evt => {
    this.setState({ isOpen: !this.state.isOpen })
    evt.preventDefault()
  }

  render() {
    return (
      <div>
        <Navbar color='inverse' inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href='/'>Eng-Box</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink
                exact to='/'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/sentences'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Sentences
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/words'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Words
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/Sources'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Sources
              </NavLink>
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
