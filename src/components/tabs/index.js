import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { removeTab } from '../../store/tabs'

import { Link } from 'react-router-dom'

const Tabs = ({ tabs, removeTab, history }) => {
  if (tabs.length) {
    const [active, setActive] = useState(tabs[0].id)

    const handleClick = tab => e => {
      window.scrollTo(0, 0)
      return setActive(tab.id)
    }

    const handleRemove = tab => e => {
      e.preventDefault()

      const currentIndex = tabs.indexOf(tab)
      const newTab = tabs[currentIndex + 1] || tabs[currentIndex - 1]

      if (newTab) {
        setActive(newTab.id)
        window.scrollTo(0, 0)
        history.push(newTab.path)
      }

      return removeTab(tab.id)
    }

    return (
      <nav className='tabs'>
        {tabs.map(tab => {
          const isActive = active === tab.id

          return (
            <div key={tab.id} className={['tab-link', isActive && 'tab-link-active'].filter(Boolean).join(' ')}>
              <Link
                to={tab.path}
                onClick={handleClick(tab)}
              >
                {tab.name}
              </Link>
              {isActive && (
                <button className='remove-tab-link' onClick={handleRemove(tab)}>Remove tab</button>
              )}
            </div>
          )
        })}
      </nav>
    )
  }

  return null
}

export default compose(
  connect(null, { removeTab }),
  withRouter
)(Tabs)
