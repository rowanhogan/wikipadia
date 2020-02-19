import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPage } from '../../lib/api'
import { addTab } from '../../store/tabs'

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
    this.setState({ loading: true })

    return fetchPage(title)
      .then(({ title, content, sections }) => {
        document.title = `${title} - Wikipadia`

        this.setState(
          {
            loading: false,
            title,
            content,
            sections
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
    const { tabs } = this.props
    const { title } = this.state

    if (e.target.nodeName === 'A' && this.isWebApp()) {
      e.preventDefault()

      const url = e.target.href.replace(window.location.origin, '')

      if (tabs.length === 0) {
        this.props.addTab(title, `/${encodeURIComponent(title.replace(/ /g, '_'))}`)
      }

      this.props.addTab(decodeURIComponent(url.split('/')[1].replace(/_/g, ' ')), url)
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

const mapStateToProps = ({ tabs }) => ({ tabs })

export default compose(
  connect(mapStateToProps, { addTab }),
  withRouter
)(Page)
