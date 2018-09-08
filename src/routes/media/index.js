import React, { Component } from 'react'
import keys from 'lodash/keys'
import { fetchMedia } from '../../lib/api'

import Loading from '../../components/loading'

export default class extends Component {
  constructor(props) {
    super(props)
    const { match: { params: { title } } } = props

    this.state = {
      loading: false,
      title
    }
  }

  componentDidMount() {
    return this.fetchPage(this.state.title)
  }

  fetchPage(title) {
    this.setState({ loading: true })

    return fetchMedia(`File:${decodeURIComponent(title)}`)
      .then(({ title, content }) => {
        document.title = title

        this.setState({
          loading: false,
          title,
          content
        })
      })
      .catch(({ info }) =>
        this.setState({
          loading: false,
          error: info
        })
      )
  }

  render() {
    const { loading, title, content, error } = this.state

    console.log(content)

    return (
      <div className="container">
        {loading ? (
          <Loading title={title} />
        ) : content ? (
          <div className="media">
            <h1 className="page-title">{title}</h1>

            <div>
              <a href={content.descriptionshorturl} target="_blank">
                <img src={content.url} alt={title} />
              </a>
              <dl className="media-list">
                {keys(content.extmetadata).map(key => {
                  return (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd
                        dangerouslySetInnerHTML={{
                          __html: content.extmetadata[key].value
                        }}
                      />
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>
        ) : error ? (
          <div>
            <h1>Error</h1>
            <div>{error}</div>
          </div>
        ) : null}
      </div>
    )
  }
}
