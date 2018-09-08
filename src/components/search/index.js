import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { fetchPages } from '../../lib/api'

import OutsideClickHandler from 'react-outside-click-handler'

class Search extends Component {
  constructor(props) {
    super(props)
    this.fetchPages = this.fetchPages.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSearch = debounce(this.fetchPages.bind(this), 300)
    this.handleSelection = this.handleSelection.bind(this)
    this.state = {
      selected: 0,
      loading: false,
      open: false,
      results: []
    }
  }

  handleSelection(event) {
    const key = event.which
    const { results, selected } = this.state

    switch (key) {
      case 38:
        event.preventDefault()
        const isFirst = selected === 0
        return this.setState({
          selected: (isFirst ? results.length : selected) - 1
        })
      case 40:
        event.preventDefault()
        const isLast = selected === results.length - 1
        return this.setState({ selected: isLast ? 0 : selected + 1 })
      case 13:
        event.preventDefault()
        return (
          results[selected] && window.location.assign(results[selected].link)
        )
      default:
        return
    }
  }

  handleClose() {
    this.setState({
      error: null,
      open: false,
      loading: false,
      results: [],
      selected: 0
    })
    this.refs.input.value = ''
  }

  fetchPages(key) {
    const query = this.refs.input.value

    if (!query) {
      return this.handleClose()
    }

    if ([38, 40].indexOf(key) > -1) {
      return
    }

    this.setState({
      error: null,
      loading: true,
      open: true,
      results: [],
      selected: 0
    })

    return fetchPages(query)
      .then(results => this.setState({ loading: false, results }))
      .catch(() => this.setState({ error: true, loading: false }))
  }

  render() {
    const { error, loading, open, results, selected } = this.state

    return (
      <OutsideClickHandler onOutsideClick={this.handleClose}>
        <div className="search">
          <form className="search-form" onSubmit={e => e.preventDefault()}>
            <input
              ref="input"
              type="search"
              placeholder="Search..."
              onKeyDown={this.handleSelection}
              onKeyUp={e => this.handleSearch(e.which)}
            />
          </form>
          {open && (
            <div className="search-results">
              {loading && <div className="spinner">Loading&hellip;</div>}
              {error && <div className="search-error">No results found</div>}
              {results.map((result, index) => (
                <a
                  href={result.link}
                  className={[
                    'search-result',
                    selected === index ? 'active' : undefined
                  ].join(' ')}
                  key={index}
                  onClick={() => this.setState({ open: false })}>
                  <h3 className="search-result-title">{result.title}</h3>
                  <p className="search-result-description">
                    {result.description}
                  </p>
                  <div
                    className="search-result-thumb"
                    style={{ backgroundImage: `url(${result.thumb})` }}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </OutsideClickHandler>
    )
  }
}

export default Search
