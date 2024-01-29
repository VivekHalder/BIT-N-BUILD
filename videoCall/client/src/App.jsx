import React from "react";
import Lobby from "./components/Lobby";
import { SocketProvider } from "./context/SocketProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Lobby />}></Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
