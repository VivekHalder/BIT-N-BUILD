import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className=" ">
      
      <div className=" mt-[208px]">

      


      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input 
          type="email"
          id="email"
          value={email}
          className=" border-2 border-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br/>
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          className="border-2 border-black"
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <br/>
        <button className=" bg-blue-500 text-xl text-white px-[20px] py-[10px]">Join</button>
      </form>
      </div>
      
    </div>
  );
};

export default Lobby;
