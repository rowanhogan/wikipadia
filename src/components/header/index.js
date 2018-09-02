import React, { Component } from 'react'
// import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      hidden: false,
      scroll: window.scrollY || 0
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const { scrollY } = window
    const { scroll } = this.state

    this.setState({ scroll: scrollY, hidden: scrollY > scroll })
  }

  render() {
    const { hidden } = this.state

    return window === window.top ? (
      <header className={['header', hidden ? 'hidden' : undefined].join(' ')}>
        <Link className="logo" to="/">
          Home
        </Link>
      </header>
    ) : null
  }
}

export default Header
