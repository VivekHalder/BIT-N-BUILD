import React, { useCallback, useState,useEffect} from "react";
import { Form } from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
export default function Lobby() {
  const [input, setInput] = useState({
    email: "",
    roomId: "",
  });
  const socket=useSocket();
  const handleSubmit=useCallback((e)=>{
    e.preventDefault();
    socket.emit('room:join',input);
  },[input,socket])

  useEffect(()=>{
    socket.on('room:join',(data)=>{
        console.log(`Data from be ${data}`);
    },[])
  })

  return (
    <div className=" h-screen w-screen flex items-center flex-col gap-3">
      <div>Lobby Screen</div>
      <form>
        <label>EmailId</label>
        <input
          type="email"
          onChange={(event) => {
            setInput({ ...input, email: event.target.value });
          }}
        ></input>
        <br />
        <br></br>
        <label>Room Number</label>
        <input
          type="text"
          onChange={(event) => {
            setInput({ ...input, roomId: event.target.value });
          }}
        ></input>
        <br />
        <button className=" box-border bg-blue-400 text-white px-[10px] py-[5px]" onClick={(e)=>{
            handleSubmit(e);
        }}>
          Join
        </button>
      </form>
    </div>
  );
}
