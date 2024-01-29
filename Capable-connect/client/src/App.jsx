import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import { Lobby} from './screens/LobbyScreen'
import { Room } from './screens/RoomScreen'

function App() {
 
  return (
    <div>
      

      <Routes>
        <Route path='/' element={<Lobby></Lobby>}/>
        <Route path='/room/:roomID' element={<Room></Room>}></Route>
      </Routes>
   
   
      I 
        
    </div>
  )
}

export default App
