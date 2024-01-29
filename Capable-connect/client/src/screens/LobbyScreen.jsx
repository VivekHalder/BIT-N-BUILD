import React, { useState,useCallback,useEffect } from 'react'
import {useSocket} from '../context/SocketProvider'
import { useNavigate } from 'react-router-dom'

export const Lobby = () => {

  const navigate=useNavigate()

  const [email,setEmail]=useState("")
  const [roomID,setroomID]=useState("")

  const socket=useSocket()
 

  const submitHandler=useCallback(e=>{
    e.preventDefault();
    socket.emit('join:room',{email,roomID});

    },[email,roomID,socket]
  )

  
  const handleJoinRoom=useCallback(data=>{
      const{email,roomID}=data
      navigate(`/room/${roomID}`)
      
  },[navigate])

  useEffect(()=>{
    console.log("hello")
    socket.on("join:room",handleJoinRoom)

    return ()=>{
      socket.off("join:room",handleJoinRoom)
    }
  },[socket,handleJoinRoom])

  

  return (
    <div className='flex justify-center items-center  flex-col '>
      <h1 className=' text-center mb-7 font-bold text-4xl'>Lobby Screen</h1>
      <form onSubmit={submitHandler}>
       
       <label htmlFor='email'>Enter your Email</label> 
      <input type='text' onChange={e=>{setEmail(e.target.value)}} value={email} className=' border-2 border-black email ml-2 email mb-4' id="email" placeholder='Enter your email'  />

        <br/>


        <label htmlFor='roomID'>Enter your Room ID</label> 
        <input type='text' onChange={e=>{setroomID(e.target.value)}} value={roomID} className=' border-2 border-black  ml-2' id="roomID" placeholder='Enter you room ID'/>

        <br/>

        <button className=' text-white text-xl py-[10px] px-[20px] bg-blue-500  mt-4 ml-[100px]'>Join</button>

        
      </form>
    </div>
  )
}
