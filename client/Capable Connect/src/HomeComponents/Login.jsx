import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    phone: "",
    password: "",
  });

  const handleInput = (event) => {
    console.log(input);
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post( "http://localhost:2100/api/v1/users/login", { ...input }, { withCredentials: true } );

    if( res ){
      console.log(res);
      if( res.data.data.disability === "Blind" ){
        navigate('/chat-space');
      } else{
        navigate('/video-call-room');
      }

      setInput( {
        phone: "",
        password: ""
      } );
    }
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
            placeholder="Phone Number"
            name="phone"
            value={input.phone}
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
            type="password"
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
        onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
