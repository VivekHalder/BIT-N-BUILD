import React, { useContext } from "react"
import { Home } from "./HomeComponents"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import ChatApp from './chat component/ChatApp';

import Lobby from './screens/Lobby'
import RoomPage from './screens/RoomScreen'
import { UserContext } from "./context/UserProvider";
import { ChatProvider } from "./context/ChatProvider";

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

  const { user } = useContext( UserContext );

  return (
    <ChatProvider user={ user }>
      <div className=" h-screen w-screen flex justify-center items-center">
          <RouterProvider router={router}/>
      </div>
    </ChatProvider>
  );
}
export default App;