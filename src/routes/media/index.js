import React, { Component } from 'react'
import { fetchMedia } from '../../lib/api'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      title: props.title,
      content: undefined,
      sections: undefined
    }
  }

  componentDidMount() {
    const { match: { params: { title } } } = this.props
    return this.fetchPage(title)
  }

  fetchPage = title => {
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
      <div>
        {loading && <p>Loading&hellip;</p>}
        {content ? (
          <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ) : error ? (
          <div>
            <h1>Error</h1>
            <div>{error}</div>
          </div>
        ) : (
          <h1>{title}</h1>
        )}
      </div>
    )
  }
}
