import React from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect,
} from 'react-router-dom'

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
      )
    )}
  />
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})
/*
https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
*/

export default connect(
  mapStateToProps,
  null,
  null,
  {pure: false},
)(PrivateRoute)
