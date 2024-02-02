import React from "react"
import { Home } from "./HomeComponents"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import ChatApp from './chat component/ChatApp';

import Lobby from './screens/Lobby'
import RoomPage from './screens/RoomScreen'

const router=createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/chat-space',
    element: <ChatApp/>
  },
  {
    path: '/video-call-room',
    children: [
      {
        path: '/video-call-room',
        element: <Lobby/>
      },
      {
        path: '/video-call-room/:roomID',
        element: <RoomPage/>
      }
    ]
  }
])

function App() {
  return (
   <div className=" h-screen w-screen flex justify-center items-center">
      <RouterProvider router={router}/>
   </div>
  );
}
export default App;