import React from "react";
import get from "lodash/get";
import { withSiteData } from "react-static";
import { fetchPage } from "../lib/api";

class Home extends React.Component {
  constructor() {
    super();
    this.fetchPage = this.fetchPage.bind(this);

    this.state = {
      loading: false,
      content: undefined
    };
  }

  componentWillMount() {
    const { location: { search } } = this.props;

    if (search.length) {
      return this.fetchPage(search.substring(1));
    }
  }

  fetchPage(title) {
    this.setState({ loading: true });

    return fetchPage(decodeURIComponent(title)).then(data => {
      this.setState({
        loading: false,
        title: data.title,
        content: data.text["*"]
      });
    });
  }

  render() {
    const { title, location: { search } } = this.props;
    const { loading, content } = this.state;

    return (
      <div>
        {loading && <p>Loading&hellip;</p>}
        {content ? (
          <div>
            <h1>{this.state.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ) : (
          <h1>{title}</h1>
        )}
      </div>
    );
  }
}

export default withSiteData(Home);
