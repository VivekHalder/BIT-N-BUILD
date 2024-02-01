import React from 'react'
import Navbar from './Navbar'
import Content from "./Content"

const Home = () => {
  return (
    <div className=' h-screen w-screen overflow-x-hidden '>
      <Navbar/>
      <Content/>
    </div>
  )
}

export default Home
