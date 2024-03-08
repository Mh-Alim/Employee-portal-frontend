import React, { useRef, useState } from "react";

const FeatureRequest = () => {
  const [selectVal, setSelectVal] = useState("feedback");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectVal, textRef.current?.value);
  };
  return (
    <div className="  dis-bg-red-950 h-[100vh] flex justify-center items-center ">
      <form onSubmit={submitHandler} className=" flex flex-col  w-3/5  ">
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectVal(e.target.value);
          }}
          className=" bg-slate-200 p-3 outline-none rounded-lg my-4 "
          name=""
          id=""
        >
          <option selected value="feedback">
            General Feedback
          </option>
          <option value="bug">
            Bug
          </option>
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
          className="  p-5 rounded-lg font-work_sans outline-none  "
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
