import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

export default function Login() {
  const [input, setInput] = useState({
    phonenumber: "",
    password: "",
  });

  const handleInput = (event) => {
    console.log(input);
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 ml-[20px] -mt-[30px]">
      <div className=" text-[25px] font-bold mb-[20px]">Sign IN</div>
      <div className=" flex flex-col justify-center items-center gap-3">
        <div className="flex">
          <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
            <FaPhoneAlt className=" text-white text-[20px]" />
          </div>
          <input
            type="number"
            className=" box-border border-2 border-black px-[10px]"
            placeholder="phone number"
            name="phonenumber"
            value={input.phonenumber}
            onChange={(event) => {
              handleInput(event);
            }}
          />
        </div>
        <div className="flex">
          <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
            <FaKey className=" text-white text-[16px]" />
          </div>
          <input
            type="text"
            className=" box-border border-2 border-black px-[10px]"
            placeholder="********"
            name="password"
            value={input.password}
            onChange={(event) => {
              handleInput(event);
            }}
          />
        </div>
        <button
        className=" box-border bg-orange-600 text-white px-[20px] py-[5px] mt-[20px] hover:bg-orange-400 rounded-md"
        onClick={() => {
          console.log(input);
        }}
      >
        Sign In
      </button>
      </div>
    </div>
  );
}
