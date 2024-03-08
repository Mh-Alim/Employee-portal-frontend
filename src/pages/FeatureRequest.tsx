import React, { useRef, useState } from "react";

const FeatureRequest = () => {
  const [selectVal, setSelectVal] = useState("feedback");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectVal, textRef.current?.value);
  };
  return (
    <div className=" bg-[#0D1000] text-white  dis-bg-red-950 h-[100vh] flex justify-center items-center ">
      <form onSubmit={submitHandler} className=" flex flex-col  w-3/5  ">
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
            selectVal === "bug" ? `Report ${selectVal}` : ` Write ${selectVal} `
          }
          name=""
          id=""
          cols={30}
          rows={10}
          className="  font-work_sans  mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent "
          ref={textRef}
        ></textarea>
        <button
          className=" bg-green-50  my-5 p-2 px-5 rounded-lg w-fit mx-auto "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeatureRequest;
