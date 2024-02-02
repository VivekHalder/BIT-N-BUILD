import React, { useState } from 'react'
import RegisterMessage from './RegisterMessage';
import LoginMessage from './LoginMessage';
export default function Transition() {
    const [animate,setAnimate]=useState(0);
    var classState=" "
    classState=""
    if(!animate)
    {
        classState="absolute top-0 right-0  bg-orange-600  h-[400px] w-[400px] text-white rounded-l-3xl rounded-r-lg flex justify-center items-center z-2 transition ease-in-out duration-600"
    }
    else classState="absolute top-0 right-0  bg-orange-600  h-[400px] w-[300px] text-white rounded-r-3xl rounded-l-lg flex justify-center items-center z-2 transition -translate-x-[400px] transition ease-in-out duration-600"
    function handleClick(x)
    {
      setAnimate(x);
    }
  return (
    <div className={classState}>
        <>
          {
            !animate
            ? <RegisterMessage handleClick={handleClick}></RegisterMessage>
            : <LoginMessage handleClick={handleClick}></LoginMessage>
          }
        </>
    </div>
  )
}
