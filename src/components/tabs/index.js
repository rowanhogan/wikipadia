import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { activateTab, removeTab } from '../../store/tabs'

import { Link } from 'react-router-dom'

const Tabs = ({ activateTab, active, pages, tabs, removeTab, history }) => {
  if (tabs.length > 1) {
    const handleClick = tab => e => {
      window.scrollTo(0, 0)
      return activateTab(tab.id)
    }

    const handleRemove = tab => e => {
      e.preventDefault()

      const currentIndex = tabs.indexOf(tab)
      const newTab = tabs[currentIndex + 1] || tabs[currentIndex - 1]

      if (newTab) {
        activateTab(newTab.id)
        window.scrollTo(0, 0)
        history.push(newTab.path)
      }

      return removeTab(tab.id)
    }

    return (
      <nav className='tabs'>
        {tabs.map(tab => {
          const isActive = active === tab.id
          const page = pages[tab.path.substring(1)]

          return (
            <div key={tab.id} className={['tab-link', isActive && 'tab-link-active', (isActive && !page) && 'tab-link-loading', !page && 'tab-link-inactive'].filter(Boolean).join(' ')}>
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

const mapStateToProps = ({ pages, tabs }) => ({
  active: tabs.active,
  pages,
  tabs: tabs.items
})

const mapDispatchToProps = { activateTab, removeTab }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Tabs)
