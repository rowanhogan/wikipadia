import React from 'react'

export default ({ title }) => (
  <div className="loading">
    <h1 className="page-title">{title.replace(/_/g, ' ')}</h1>
  </div>
)
