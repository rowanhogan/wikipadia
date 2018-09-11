import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/header'
import Footer from '../../components/footer'

const App = ({ classNames, children }) => (
  <div className={classNames.join(' ')}>
    <Header />
    {children}
    <Footer />
  </div>
)

const mapStateToProps = ({ settings }) => ({
  classNames: Object.keys(settings).filter(setting => settings[setting])
})

export default connect(mapStateToProps)(App)
