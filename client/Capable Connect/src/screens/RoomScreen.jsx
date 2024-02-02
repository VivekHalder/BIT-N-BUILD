import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer"
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {

  const navigate=useNavigate()
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const endCallHandler=()=>{

    navigate("/video-call-room")
    
  }

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="bg-[#3c4043] h-[100vh] w-[100vw] overflow-x-hidden overflow-y-hidden">
     
      <h4> {remoteSocketId ? <p className="text-white">Connected to {remoteSocketId}</p> :  <p className="text-white flex justify-center items-center text-4xl font-bold w-[100vw] h-[100vh] ">No one in the Room </p>} </h4>
      {myStream && <button onClick={sendStreams} className="bg-blue-500 text-xl text-white px-[20px] py-[10px] mr-10 mb-2 rounded-lg border-2 border-white">Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser} className="bg-blue-500 text-xl text-white px-[20px] py-[10px] rounded-lg border-2 border-white">CALL</button>}
      <div className="bg-[#3c4043] absolute w-[234px] h-[132px] rounded-lg right-10 bottom-10 z-10 overflow-hidden"> 
      

        {myStream && (
          <>
            

            <ReactPlayer
              playing
              
              height="100%"
              width="100%"
              url={myStream}
            />
          </>
        )}
      </div>

      <div className=" w-[1277px] h-[646px] flex justify-center items-center mx-auto relative">
      {remoteStream && (
        <>
         
          <ReactPlayer
            playing
            
            height="100%"
            width="100%"
            url={remoteStream}
          />
        </>
      )}
      </div>

      
      {myStream && <button className="bg-red-500 text-xl text-white px-[20px] py-[10px] left-4 bottom-4 z-10 absolute rounded-lg border-2 border-white" onClick={endCallHandler} > END CALL</button>}
      
    </div>
  );
};

export default RoomPage;
