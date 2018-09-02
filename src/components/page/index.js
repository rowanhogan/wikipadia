import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { fetchPage } from '../../lib/api'
import Loading from '../../components/loading'

class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      title: '',
      content: undefined,
      sections: undefined
    }
  }

  componentDidMount() {
    const { title } = this.props
    return this.fetchPage(title)
  }

  fetchPage = title => {
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

  render() {
    const { loading, title, content, error } = this.state

    return (
      <div className="container">
        {loading && <Loading {...this.props} />}
        {content ? (
          <div className="page">
            <h1
              className="page-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
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

export default withRouter(Page)
