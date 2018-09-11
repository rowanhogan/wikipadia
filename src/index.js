import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './routes/app'
import './styles/styles.css'
import initReactFastclick from 'react-fastclick'

if ('ontouchstart' in document.documentElement) {
  document.body.style.cursor = 'pointer'
}

initReactFastclick()

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
