import React, { useCallback, useEffect,useState } from 'react'
import {useSocket} from '../context/SocketProvider'
import Peer from '../services/Peer'
import ReactPlayer from 'react-player'

export const Room = () => {



    const socket=useSocket();

    const [remoteSocketID,setremoteSocketID]=useState(null)
    const[myStream,setMyStream]=useState()

    const handleUserJoined=useCallback(({email,id})=>{

        console.log(`New User Joined ${email} and ${id}`)
        setremoteSocketID(id)
        
    },[])

    const handleIncomingCall=useCallback(async ({from,offer})=>{
        setremoteSocketID(from)
        const stream =await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        setMyStream(stream)
        console.log("Incoming Call from",from," ",offer)
        const ans=await Peer.getAnswer(offer)
        socket.emit("call:accepted",{to:from,ans})


    },[socket])

    const handleCallAccepted=useCallback(({from,ans})=>{

        Peer.setLocalDescription(ans)
        console.log("Call Accepted")


    },[])

    useEffect(()=>{

        socket.on("user:joined",handleUserJoined)
        socket.on("incoming:call",handleIncomingCall)
        socket.on("call:accepted",handleCallAccepted)

        return ()=>{
            socket.off("user:joined",handleUserJoined)
            socket.off("incoming:call",handleIncomingCall)
            socket.off("call:accepted",handleCallAccepted)
        }
    },[socket,handleUserJoined,handleIncomingCall])


    const clickHandler=useCallback(async ()=>{

        const stream =await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        const offer= await Peer.getOffer()
        console.log(offer)
        if(remoteSocketID){
            
            socket.emit("user:call",{toID: remoteSocketID,offer})
        }
        else{
            console.log("Empty remote ID ")
        }
       
        setMyStream(stream)
    },[remoteSocketID,socket])

  return (
    <div className=' flex flex-col  justify-center items-center gap-10'>
    <h1 className=' text-4xl font-bold'>RoomScreen</h1>
    <h4>{ remoteSocketID ? `Connected ${socket.id} to ${remoteSocketID}`:"No one is in the Room"}</h4>
    {remoteSocketID && <button onClick={clickHandler} className=' border-2 border-black bg-blue-500 text-white px-[20px] py-[10px] text-xl'>CALL</button>}
    
    {myStream && 
    <>
    <h1>My video</h1>
    <ReactPlayer playing muted width="200px" height="200px" url={myStream}/>
    </>}
    </div>


  )
}
