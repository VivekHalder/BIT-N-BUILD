import React from "react";
import "./Content.css";
const Content = () => {
  return (
    <div className=" w-screen flex flex-col justify-center items-center bg-orange-200 gap-5">
      <div className=" text-[30px] text-orange-600 font-black">
       Capable Connect
      </div>
      <div>where innovation meets inclusivity!</div>
      <div className="ml-[100px] mt-[60px]">
        <img
          src="./src/images/shutterstock_1927342577_0-removebg.png"
          alt=""
          className=" object-cover w-screen h-[300px] "
        />
      </div>
      <div className=" h-[40px] w-screen"></div>
    </div>
  );
};

export default Content;
