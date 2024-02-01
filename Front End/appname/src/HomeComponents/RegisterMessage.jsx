import React from "react";

export default function RegisterMessage({ handleClick }) {
  return (
    <div className=" flex flex-col text-white justify-center items-center gap-4">
      <div className="text-[25px] font-black ml-[40px]">Hello, Friend!</div>
      <div className="flex flex-col justify-center items-center">
        <div>Register With Your Personal Details to Use all</div>
        <div>of Site Features</div>
      </div>
      <button
        className=" box-border text-[10px] border-white border-2 px-[25px] rounded-lg py-[5px] hover:bg-white hover:text-orange-600"
        onClick={() => {
          handleClick(1);
        }}
      >
        SIGN UP
      </button>
    </div>
  );
}
