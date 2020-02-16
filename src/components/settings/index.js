import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSetting } from '../../store/settings'

import Modal from '../modal'
import Toggle from '../toggle'

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
  }

  handleClickOutside (event) {
    if (this.state.open) {
      event.preventDefault()
      this.setState({ open: false })
    }
  }

  render () {
    const { settings } = this.props
    const { open } = this.state

    return (
      <Fragment>
        <button
          className='settings-button'
          onClick={() => this.setState({ open: true })}
        >
          Settings
        </button>
        <Modal
          isOpen={open}
          title='Settings'
          handleClose={() => this.setState({ open: false })}
        >
          <Toggle
            label='Dark Mode'
            name='darkMode'
            checked={settings.darkMode}
            onChange={this.props.updateSetting}
          />
          <p className='settings-hint'>
            Light text on dark background (defaults to OS preference)
          </p>

          <Toggle
            label='Low contrast'
            name='lowContrast'
            checked={settings.lowContrast}
            onChange={this.props.updateSetting}
          />
          <p className='settings-hint'>
            Reduce eye strain for low-light reading.
          </p>

          <Toggle
            label={settings.sansSerif ? 'Sans-serif fonts' : 'Serif fonts'}
            name='sansSerif'
            checked={settings.sansSerif}
            onChange={this.props.updateSetting}
          />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ settings }) => ({ settings })
const mapDispatchToProps = { updateSetting }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
