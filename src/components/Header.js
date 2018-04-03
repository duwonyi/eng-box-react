import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
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
import Logout from './Logout'
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
    const {
      isAuthenticated,
      logout,
    } = this.props
    return (
      <div>
        <Navbar color='dark' dark expand>
          <NavbarToggler right='true' onClick={this.toggle} />
          <NavbarBrand href='/'>English-Box</NavbarBrand>
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
                to='/sources'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Sources
              </NavLink>
            </NavItem>
          {!isAuthenticated &&
            <NavItem>
              <NavLink
                to='/signin'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Sign in
              </NavLink>
            </NavItem>
          }
          {!isAuthenticated &&
            <NavItem>
              <NavLink
                to='/signup'
                className='item'
                activeClassName='active'
                tag={RRNavLink}
              >
                Sign up
              </NavLink>
            </NavItem>
          }
          </Nav>
          {isAuthenticated &&
            <Logout
              onLogout = {logout}
            />
          }
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch(logout())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
