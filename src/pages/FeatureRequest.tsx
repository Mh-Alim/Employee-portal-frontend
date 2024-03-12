import { feedbackApi } from "@/api/Feedback";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";
import React, { useRef, useState } from "react";

const FeatureRequest = () => {
  const [selectVal, setSelectVal] = useState("feedback");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectVal, textRef.current?.value);

    const type = selectVal;
    const message = textRef.current?.value;
    const token = getTokenFromLocalStorage();
    const user_email = getEmailFromLocalStorage();

    if (!type || !message || !token || !user_email) {
      alert("fill the empty fields");
      return;
    }

    await feedbackApi(token, user_email, type, message);

    if (textRef.current) {
      textRef.current.value = "";
    }
  };
  return (
    <div className=" bg-[#0D1000] text-slate-400  dis-bg-red-950 h-[100vh] flex justify-center items-center relative z-20 bg-circule  ">
      <div className=" bg-glassmorphism flex flex-col w-fit h-fit p-9 justify-center items-center z-40  ">
        <form onSubmit={submitHandler} className=" w-60  sm:w-96    ">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectVal(e.target.value);
            }}
            className=" bg-slate-200  my-4 mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent "
            name=""
            id=""
          >
            <option selected value="feedback">
              General Feedback
            </option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
          </select>

          <textarea
            placeholder={
              selectVal === "bug"
                ? `Report ${selectVal}`
                : ` Write ${selectVal} `
            }
            name=""
            id=""
            cols={30}
            rows={10}
            className="  font-work_sans  mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent "
            ref={textRef}
          ></textarea>
          <button
            className=" bg-slate-500 text-white flex justify-center items-center  my-5 p-2 px-5 rounded-lg w-fit mx-auto "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeatureRequest;
