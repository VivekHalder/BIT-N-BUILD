import React, { useState } from 'react'
const Navbar = () => {

  return (
    <div className=' w-screen h-[100px] bg-orange-500 text-white flex justify-between items-center overflow-x-hidden'>
      <div className=' text-[24px] font-black ml-[30px]'>Capable Connect</div>
      <button className=' box-border border-white border-2 px-[20px] py-[5px] mr-[100px] hover:bg-white hover:text-orange-600'
      >Sign IN/Up</button>
    </div>
  )
}

export default Navbar;