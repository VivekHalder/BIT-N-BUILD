
import React, { useState } from "react";
import Content from "./Content";
import Authentication from "./Authentication";
import Navbar from "./Navbar";


const Home = () => {
  const [signState,setSignState]=useState(0);
  function openSign(){
    setSignState(1);
  }
  "filter blur-lg"
  return (
    <div className="relative h-screen w-screen">
      <div className={` ${ signState ? "filter blur-lg" : "" } `}>
        <Navbar openSign={openSign}></Navbar>
        <Content></Content>
      </div>
      <div className=" absolute top-0 left-0">
        {signState ? <Authentication  /> : ""}
      </div>
    </div>
  );
};

export default Home;
