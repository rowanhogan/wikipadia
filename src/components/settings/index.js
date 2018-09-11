import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateSetting } from '../../store/settings'
import withClickOutside from 'react-click-outside'

import Toggle from '../toggle'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleClickOutside(event) {
    if (this.state.open) {
      event.preventDefault()
      this.setState({ open: false })
    }
  }

  render() {
    const { settings } = this.props
    const { open } = this.state

    return (
      <div className="settings">
        <button
          className="settings-button"
          onClick={() => this.setState({ open: true })}>
          Settings
        </button>
        {open && (
          <div className="modal settings-modal">
            <button
              className="close"
              onClick={() => this.setState({ open: false })}>
              Close
            </button>
            <h3>Settings</h3>

            <Toggle
              label="Low contrast"
              name="lowContrast"
              checked={settings.lowContrast}
              onChange={this.props.updateSetting}
            />
            <p className="settings-hint">
              Reduce eye strain for low-light reading.
            </p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => ({ settings })
const mapDispatchToProps = { updateSetting }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withClickOutside
)(Settings)
