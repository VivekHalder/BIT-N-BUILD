import React from 'react'
const Navbar = ({ openSign }) => {
  return (
    <div className=' w-screen h-[100px] bg-orange-500 text-white flex justify-between items-center '>
      <div className=' text-[24px] font-black ml-[30px]'>Capable Connect</div>
      <button className=' box-border border-white border-2 px-[20px] py-[5px] mr-[100px] rounded-md hover:bg-white hover:text-orange-600'
      onClick={()=>{
        openSign();
      }}
      >Sign IN/Up</button>
    </div>
  )
}

export default Navbar;