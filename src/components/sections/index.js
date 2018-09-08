import React, { Component } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

class Sections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {
    const { sections } = this.props
    const { open } = this.state

    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setState({ open: false })}>
        <div
          className={['page-sections', open ? 'active' : undefined].join(' ')}>
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
                  onClick={() => this.setState({ open: false })}>
                  <span
                    className={`section-level section-level-${
                      section.toclevel
                    }`}>
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
      </OutsideClickHandler>
    )
  }
}

export default Sections
