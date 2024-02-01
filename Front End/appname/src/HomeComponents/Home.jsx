import React from 'react'
import Navbar from './Navbar'
import Content from "./Content"
import Authentication from './Authentication'
const Home = () => {
  return (
    <div className=' h-screen w-screen overflow-x-hidden '>
      <Navbar></Navbar>
      <Content></Content>
      
    </div>
  )
}

export default Home
