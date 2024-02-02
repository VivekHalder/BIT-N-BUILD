import React from "react";
import Login from "./Login";
import Register from "./Register";
import Transition from "./Transition";
import "./Content.css";
export default function Authentication() {
  return (
    <div className=" h-screen w-screen justify-center items-center flex">
      <div className="relative w-[700px] h-[400px] box-border bg-orange-200 rounded-lg flex justify-between items-center shadow ">
        <Login></Login>
        <Register></Register>
        <Transition></Transition>
      </div>
    </div>
  );
}
