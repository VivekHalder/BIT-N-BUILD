import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Register } from "../src/HomeComponents";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
]);

function App() {
  return (
   <div className=" h-screen w-screen flex justify-center items-center">
      <RouterProvider router={router}/>
   </div>
  );
}

export default App;