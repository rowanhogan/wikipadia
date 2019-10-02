import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../../components/header'
import Footer from '../../components/footer'

class App extends Component {
  componentDidMount () {
    if (this.props.darkMode) {
      document.documentElement.style.backgroundColor = 'black'
    }
  }

  componentDidUpdate ({ darkMode }) {
    if (this.props.darkMode !== darkMode) {
      document.documentElement.style.backgroundColor = this.props.darkMode
        ? 'black'
        : 'transparent'
    }
  }

  render () {
    const { children, classNames } = this.props

    return (
      <div className={`settings-wrapper ${classNames.join(' ')}`}>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => ({
  darkMode: settings.darkMode,
  classNames: Object.keys(settings).filter(setting => settings[setting])
})

export default connect(mapStateToProps)(App)
