import React from 'react'
import Page from '../../components/page'

export default () => (
  <div className="home-page">
    <div className="container">
      <h1 className="page-title">Wikipadia</h1>
      <div className="blurb">
        <p>
          <em>WikiPadia</em> is a beautiful, customisable Wikipedia reader. It
          was specifically built for leisurely reading on an iPad.
        </p>
        <p>
          <a href="https://github.com/rowanhogan/wikipadia">Source code</a>
        </p>
      </div>
    </div>

    <Page title="Main_page" />
  </div>
)
