import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPage } from '../../lib/api'
import { stripTags } from '../../lib/html'
import { addTab } from '../../store/tabs'
import { storePage } from '../../store/pages'

import Loading from '../loading'
import Sections from '../sections'

class Page extends Component {
  constructor (props) {
    super(props)
    this.fetchPage = this.fetchPage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      loading: false,
      title: '',
      content: undefined,
      sections: []
    }
  }

  componentDidMount () {
    const { title } = this.props
    return this.fetchPage(title)
  }

  componentDidUpdate ({ title }) {
    if (title !== this.props.title) {
      return this.fetchPage(this.props.title)
    }
  }

  fetchPage (title) {
    const { pages, storePage } = this.props
    const pageIsCached = !!pages[title]

    this.setState({ loading: true })

    return Promise.resolve()
      .then(() => pageIsCached ? pages[title] : fetchPage(title))
      .then(page => {
        document.title = `${page.title} - Wikipadia`
        storePage(title, page)

        this.setState(
          {
            loading: false,
            ...page
          },
          () => {
            const { location: { hash } } = this.props

            if (hash && document.querySelector(hash)) {
              document.querySelector(hash).scrollIntoView()
            }
          }
        )
      })
      .catch(({ info }) =>
        this.setState({
          loading: false,
          error: info
        })
      )
  }

  isWebApp () {
    return ('standalone' in window.navigator) && window.navigator.standalone
  }

  handleClick (e) {
    const { storePage, tabs } = this.props
    const { title } = this.state

    if (e.target.className === 'reflist') {
      e.target.classList.add('expanded')
    }

    if (e.target.nodeName === 'A' && this.isWebApp()) {
      e.preventDefault()

      const url = e.target.href.replace(window.location.origin, '')
      const newTitle = decodeURIComponent(url.split('/')[1].replace(/_/g, ' '))

      if (tabs.length === 0) {
        this.props.addTab(stripTags(title), `/${encodeURIComponent(stripTags(title).replace(/ /g, '_'))}`)
      }

      this.props.addTab(newTitle, url)

      fetchPage(newTitle)
        .then(page => storePage(newTitle, page))
    }
  }

  render () {
    const { content, error, loading, sections, title } = this.state

    return (
      <div className='container'>
        {loading ? <Loading {...this.props} /> : (
          <Fragment>
            {sections.length ? <Sections sections={sections} /> : null}
            {content ? (
              <div className='page'>
                <h1
                  className='page-title'
                  dangerouslySetInnerHTML={{ __html: title }}
                  />
                <div onClick={this.handleClick} dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : error ? (
              <div>
                <h1 className='page-title'>Error</h1>
                <div>{error}</div>
              </div>
            ) : null}
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ pages, tabs }) => ({
  pages,
  tabs: tabs.items
})

export default compose(
  connect(mapStateToProps, { addTab, storePage }),
  withRouter
)(Page)
