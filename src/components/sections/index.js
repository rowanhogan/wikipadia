import React, { Component } from 'react'
import withClickOutside from 'react-click-outside'

class Sections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleClickOutside(event) {
    if (this.state.open) {
      event.preventDefault()
      this.setState({ open: false })
    }
  }

  render() {
    const { sections } = this.props
    const { open } = this.state

    return (
      <div className={['page-sections', open ? 'active' : undefined].join(' ')}>
        <button
          className="page-sections-button"
          onClick={() => this.setState({ open: !open })}>
          Table of contents
        </button>
        {open && (
          <nav className="page-sections-nav">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.anchor}`}
                onClick={() =>
                  setTimeout(() => this.setState({ open: false }), 100)
                }>
                <span
                  className={`section-level section-level-${section.toclevel}`}>
                  {section.number}.
                </span>
                <span
                  className="section-label"
                  dangerouslySetInnerHTML={{ __html: section.line }}
                />
              </a>
            ))}
          </nav>
        )}
      </div>
    )
  }
}

export default withClickOutside(Sections)
