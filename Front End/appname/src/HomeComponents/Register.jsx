import React, { useState } from "react";
import { MdOutlineMail, MdSettingsInputComponent } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaGenderless } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBlind } from "react-icons/fa";
export default function Register() {
  const [input, setInput] = useState({
    name: "",
    dob: "",
    sex: "",
    phonenumber: "",
    disability: "",
    password: "",
  });
  const handleInput = (event) => {
    console.log(input);
    setInput({ ...input, [event.target.name]: event.target.value });
  };
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
        <input
          type="sex"
          className=" box-border border-2 border-black px-[10px]"
          placeholder="Gender"
          name="sex"
          value={input.sex}
          onChange={(event) => {

            handleInput(event);
          }}
        />
      </div>
      <div className="flex">
        <div className=" h-[30px] w-[30px] bg-slate-800 flex justify-center items-center">
          <FaPhoneAlt className=" text-white text-[20px]" />
        </div>
        <input
          type="number"
          className=" box-border border-2 border-black px-[10px] text-black"
          placeholder="phone no"
          name="phonenumber"
          value={input.phonenumber}
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
          <option value="Deaf">Deaf</option>
          <option value="Dumb">Dumb</option>
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
        onClick={() => {
          console.log(input);
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
