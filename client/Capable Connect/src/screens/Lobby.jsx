import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import NavbarAfterLogin from "../HomeComponents/NavbarAfterLogin";
import { FaHouse } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

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

      navigate(`/video-call-room/${room}`);
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
    <div className="relative h-screen w-screen bg-orange-200">
      <NavbarAfterLogin></NavbarAfterLogin>

      <div className=" flex justify-between items-center h-[600px] w-screen">
        <div className=" ml-[100px]">
          <div className=" text-[45px] font-semibold text-black">
            Revolutionizing Communication:<br></br>
            Gesture-Driven Video Calling
          </div>
          <div className=" text-[20px]  text-slate-700 mt-[30px]">
            Empowering Deaf and Dumb Communication through <br /> Intuitive Hand
            Symbol Recognition
          </div>
          <form onSubmit={handleSubmitForm} className=" mt-[40px] ">
            <div className="flex gap-4">
              <div className="flex">
                <div className=" h-[40px] w-[40px] bg-slate-800 flex justify-center items-center">
                  <IoPerson className=" text-white text-[20px]" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className=" border-2 border-black w-[250px] h-[40px] px-[10px]"
                  placeholder="Email Id"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex">
                <div className=" h-[40px] w-[40px] bg-slate-800 flex justify-center items-center">
                  <FaHouse className=" text-white text-[20px]" />
                </div>
                <input
                  type="text"
                  id="room"
                  value={room}
                  className="border-2 border-black w-[250px] h-[40px] px-[10px]"
                  placeholder="Room Id"
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
            </div>

            <br />
            <br />
            <button className=" bg-orange-600 text-xl text-white px-[25px] py-[5px] rounded-md hover:bg-white hover:text-orange-600">
              Join
            </button>
          </form>
        </div>
        <div className=" mr-[150px] flex flex-col justify-center items-center">
          <img
            src="./src/images/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
            alt=""
            className=" object-cover h-[250px] w-[250px]"
          />
          <div className=" text-[30px] font-semibold mt-[10px]">
            Get a link that you can Share
          </div>
          <div className=" h-[100px] w-[400px] mt-[10px]">
            Enter Your Email Id and Room Id and click
            on join to join a room and start a vedio call
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
