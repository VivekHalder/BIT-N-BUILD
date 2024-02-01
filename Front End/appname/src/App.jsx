import React from "react"
import Authentication from "./HomeComponents/Authentication"
import Home from "./HomeComponents/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  return (
   <div className=" h-screen w-screen flex justify-center items-center">
    <Home></Home>
   </div>
  );
}

export default App;