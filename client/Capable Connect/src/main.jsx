import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketProvider } from './context/SocketProvider.jsx'
import { UserContextProvider } from './context/UserProvider.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </UserContextProvider>,
)