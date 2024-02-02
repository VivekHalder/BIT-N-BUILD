import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaGenderless } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBlind } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';


export default function Register() {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    dob: "",
    gender: "Male",
    phone: "",
    disability: "Deaf & Dumb",
    password: "",
  });
  const handleInput = (event) => {
    console.log(event.target.value);
    setInput( (prevInput) => ({ ...prevInput, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
    //console.log("Input state before sending data ",input);
    const res = await axios.post( "http://localhost:2100/api/v1/users/register", {...input} );

    if( res.status === 200 ){
      const resLogin = await axios.post( "http://localhost:2100/api/v1/users/login", { phone: input.phone, password: input.password }, { withCredentials: true } );
      
      if( resLogin.status === 200 ){
        if( input.disability === "Blind" ){
          navigate('/chat-space');
        } else{
          navigate('/video-call-room');
        }

        setInput({
          name: "",
          dob: "",
          gender: "Male",
          phone: "",
          disability: "Deaf & Dumb",
          password: "",
        });
      }
    }
  }
  return (
    <div className=" justify-center items-start flex flex-col gap-3 w-[350px] h-[400px]">
      <div className=" font-bold text-[25px] pl-[50px]  mb-[30px]">
        Create Account
      </div>

      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <IoPerson className=" text-white text-[20px]" />
        </div>
        <input
          type="string"
          className=" box-border border-2 border-black px-[10px]"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={(event) => {

            handleInput(event);
          }}
        />
      </div>
      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <SlCalender className=" text-white text-[20px]" />
        </div>
        <input
          type="date"
          className=" box-border border-2 border-black px-[10px]"
          placeholder="DOB"
          name="dob"
          value={input.dob}
          onChange={(event) => {

            handleInput(event);
          }}
        />
      </div>
      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <FaGenderless className=" text-white text-[20px]" />
        </div>
        <select
          type="gender"
          className=" box-border border-2 border-black px-[10px]"
          placeholder="Gender"
          name="gender"
          value={input.gender}
          onChange={(event) => {
            handleInput(event);
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <FaPhoneAlt className=" text-white text-[20px]" />
        </div>
        <input
          type="number"
          className=" box-border border-2 border-black px-[10px] text-black"
          placeholder="phone no"
          name="phone"
          value={input.phone}
          onChange={(event) => {

            handleInput(event);
          }}
        />
      </div>
      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <FaBlind className=" text-white text-[20px]" />
        </div>
        <select
          name="disability"
          value={input.disability}
          onChange={(event) => {
            handleInput(event);
          }}
        >
          <option value="Deaf & Dumb">Deaf & Dumb</option>
          <option value="Blind">Blind</option>
        </select>
      </div>
      <div className="flex mb-[20px]">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <FaKey className=" text-white text-[20px]" />
        </div>
        <input
          type="text"
          className=" box-border border-2 border-black px-[10px] text-black"
          placeholder="passwd"
          name="password"
          value={input.password}
          onChange={(event) => {

            handleInput(event);
          }}
        />
      </div>
      <button
        className=" box-border bg-orange-600 text-white px-[20px] py-[5px] ml-[250px] rounded-md hover:bg-orange-400 "
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </div>
  );
}
