import React from 'react'
import Page from '../../components/page'

export default () => (
  <div>
    <div className="container">
      <h1 className="logo">Wikipadia</h1>
      <div className="blurb">
        <p>
          <em>WikiPadia</em> is a beautiful, customisable Wikipedia reader. It
          was specifically built for leisurely reading on an iPad.
        </p>
      </div>
    </div>

    <Page title="Main_page" />
  </div>
)
