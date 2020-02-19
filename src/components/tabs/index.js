import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeTab } from '../../store/tabs'

import { Link } from 'react-router-dom'

const Tabs = ({ tabs, removeTab }) => {
  if (tabs.length) {
    const [active, setActive] = useState(tabs[0].id)

    return (
      <nav className='tabs'>
        {tabs.map(tab => {
          const handleClick = e => {
            window.scrollTo(0, 0)
            return setActive(tab.id)
          }

          const handleRemove = e => {
            e.preventDefault()
            return removeTab(tab.id)
          }
          const isActive = active === tab.id

          return (
            <div key={tab.id} className={['tab-link', isActive && 'tab-link-active'].filter(Boolean).join(' ')}>
              <Link
                to={tab.path}
                onClick={handleClick}
              >
                {tab.name}
              </Link>
              <button className='remove-tab-link' onClick={handleRemove}>Remove tab</button>
            </div>
          )
        })}
      </nav>
    )
  }

  return null
}

export default connect(null, { removeTab })(Tabs)
