import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const Logout = ({ onLogout }) => (
  <Button
    outline
    color="primary"
    onClick={onLogout}
  >
    Log out
  </Button>
)

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default Logout
