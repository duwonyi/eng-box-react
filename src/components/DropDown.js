import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDown extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultOptionName: PropTypes.string,
    options: PropTypes.array,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    value: this.props.value,
    error: false
  }

  componentWillReceiveProps(update) {
    this.setState({value: update.value})
  }

  onSelect = evt => {
    const name = this.props.name
    const value = evt.target.value
    const error = this.props.validate ? this.props.validate(value) : false

    this.setState({value, error})
    this.props.onChange({name, value, error})
  }

  render() {
    const options = this.props.options || []
    const defaultOptionName = this.props.defaultOptionName || 'Select Option.'
    return (
      <div>
        <select
          onChange={this.onSelect}
          value={this.state.value || ''}
        >
          <option value=''>
            {defaultOptionName}
          </option>
          {
            options.map((option, index) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default DropDown
