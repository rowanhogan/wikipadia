import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Settings from '../settings'

class Footer extends Component {
  render() {
    return window === window.top ? (
      <footer className="footer">
        <Settings />
        <Link className="logo" to="/">
          Wikipedia
        </Link>
      </footer>
    ) : null
  }
}

export default Footer
