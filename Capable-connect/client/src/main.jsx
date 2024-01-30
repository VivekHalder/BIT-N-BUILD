import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  
      <BrowserRouter>
        <SocketProvider>
          <App />
        </SocketProvider>
       
      </BrowserRouter>
      
      
 
    
 
)
