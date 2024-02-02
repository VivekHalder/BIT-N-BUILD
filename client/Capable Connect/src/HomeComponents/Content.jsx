import React from "react";
import "./Content.css";

const Content = () => {
  return (
    <div className=" w-screen flex flex-col justify-center items-center bg-orange-200 gap-5 ">

      <div className=" text-[30px] text-orange-600 font-black mt-[30px]">
        Capable Connect
      </div>
      <div className="font-cursive text-[50px] -mt-[20px]">where innovation meets inclusivity!</div>
      <div className="ml-[100px] mt-[60px]">
        <img
          src="./src/images/shutterstock_1927342577_0-removebg.png"
          alt=""
          className=" object-cover w-screen h-[300px] "
        />
      </div>
      <div className=" h-[74px] w-screen  "></div>
      <div className="semi"></div>
      <div className=" w-screen  flex justify-around items-center  bg-white">
        {/* text */}
        <div className=" text-black w-[400px] h-[300px] ml-[100px]">
          <div className=" flex justify-center items-center  font-serif">
            <span className="text-[60px] font-medium">We</span>
            <span className=" text-[20px] mt-[10px]">
              &emsp; are dedicated to breaking down
            </span>
          </div>
          <div className=" font-serif text-[20px]">
            barriers and championing a world where everyone, regardless of their
            abilities, can thrive. Our mission is simple yet profound: to solve
            the unique challenges faced by individuals with disabilities and
            pave the way for a more accessible and inclusive future.
          </div>
        </div>
        {/* image */}
        <div className=" w-[600px] h-[600px] ">
          <img src="./src/images/empowering-people-with-disabilities-free-vector.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Content;
