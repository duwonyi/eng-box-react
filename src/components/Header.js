import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signin, logout } from '../actions/auth'
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
import Signin from './Signin'
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
      email,
      password,
      signin,
      logout,
    } = this.props
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
          {!isAuthenticated &&
            <Signin
              email={email}
              password={password}
              onSignin={signin}
            />
          }
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
  email: state.auth.email,
  password: state.auth.password,
})

const mapDispatchToProps = dispatch => ({
  signin: creds => {
    dispatch(signin(creds))
  },
  logout: () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
