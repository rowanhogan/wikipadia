import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return window === window.top ? (
      <footer className="footer">
        <Link className="logo" to="/">
          Wikipadia
        </Link>
      </footer>
    ) : null
  }
}

export default Footer
