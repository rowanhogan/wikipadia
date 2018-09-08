import React from 'react'
import Page from '../../components/page'

export default ({ match: { params }, location }) => <Page {...params} />
