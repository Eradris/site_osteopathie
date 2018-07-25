import 'babel-polyfill'
import 'core-js/fn/object/assign'
import 'core-js/fn/promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

const socket = io.connect('wss://alix-braem-osteopathe-limours.fr:3030')

ReactDOM.render(
  <SocketProvider socket={socket}>
    <App />
  </SocketProvider>,
  document.getElementById('site_alix')
)
