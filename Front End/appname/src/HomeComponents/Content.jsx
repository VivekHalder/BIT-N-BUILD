import React from "react";
import "./Content.css";
const Content = () => {
  return (
    <div className=" w-screen flex flex-col justify-center items-center bg-white gap-5 mt-[50px]">
      <div className=" text-[30px] text-orange-600 font-black">
       Capable Connect
      </div>
      <div>where innovation meets inclusivity!</div>
      <div className="ml-[100px]">
        <img
          src="./src/images/shutterstock_1927342577_0.png"
          alt=""
          className=" object-cover w-screen h-[300px] "
        />
        
      </div>
    </div>
  );
};

export default Content;
