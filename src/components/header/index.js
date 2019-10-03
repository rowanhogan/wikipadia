import React, { Component } from 'react'

import Search from '../search'
import Settings from '../settings'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor (props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      hidden: false,
      scroll: window.scrollY || 0
    }
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const { scrollY } = window
    const { scroll } = this.state
    const searchOpen = this.refs.header.querySelector('.search-results')
    const hidden = scrollY > scroll

    if (searchOpen) {
      return
    }

    this.setState({ scroll: Math.max(scrollY, 20), hidden })
  }

  render () {
    const { hidden, scroll } = this.state

    return window === window.top ? (
      <header
        ref='header'
        className={['header', hidden && 'hidden', scroll > 20 && 'scrolled']
          .filter(Boolean)
          .join(' ')}>
        <Link className='logo' to='/'>
          Home
        </Link>
        <Search />
        <Settings />
      </header>
    ) : null
  }
}

export default Header
