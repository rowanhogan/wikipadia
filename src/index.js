import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import initReactFastclick from 'react-fastclick'
import App from './routes/app'
import './styles/styles.css'

initReactFastclick()

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
