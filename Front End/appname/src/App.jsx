import React from "react"
import Home from "./HomeComponents/home"
import Authentication from "./HomeComponents/Authentication"
function App() {
  return (
   <div className=" h-screen w-screen flex justify-center items-center">
      <RouterProvider router={router}/>
   </div>
  );
}

export default App;