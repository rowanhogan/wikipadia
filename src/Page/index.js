import React, { Component } from "react";
import { fetchPage } from "../lib/api";
import Loading from "../components/Loading";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: props.title,
      content: undefined,
      sections: undefined
    };
  }

  componentDidMount() {
    const { match: { params: { title } } } = this.props;
    return this.fetchPage(title);
  }

  fetchPage = title => {
    this.setState({ loading: true });

    return fetchPage(decodeURIComponent(title))
      .then(({ title, content, sections }) => {
        document.title = title;

        this.setState(
          {
            loading: false,
            title,
            content,
            sections
          },
          () => {
            const { location: { hash } } = this.props;

            if (hash && document.querySelector(hash)) {
              document.querySelector(hash).scrollIntoView();
            }
          }
        );
      })
      .catch(({ info }) =>
        this.setState({
          loading: false,
          error: info
        })
      );
  };

  render() {
    const { loading, title, content, error } = this.state;

    return (
      <div>
        {loading && <Loading />}
        {content ? (
          <div>
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
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
    );
  }
}
