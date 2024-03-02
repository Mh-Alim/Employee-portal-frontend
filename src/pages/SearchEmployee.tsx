import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const SearchEmployee = () => {
  const [border, setBorder] = useState(0);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className=" bg-slate-200  h-[100vh] w-full flex justify-center items-center  ">
      <main className=" m-3  w-11/12 md:w-9/12 lg:w-7/12 bg-white rounded-lg   p-5 ">
        {/* search */}
        <form
          onSubmit={submitHandler}
          className=" flex items-center bg-white p-1 rounded-tl-md rounded-tr-md border-b-slate-200 border-b-2  "
        >
          <CiSearch className=" ml-2 text-2xl " />
          <input
            className=" pl-4 pr-2 py-2 w-full outline-none  bg-white"
            type="text"
          />
        </form>
        {/* heading */}
        <div className=" border-b-2 border-slate-200 overflow-scroll flex w-full bg-white  pt-3 pl-3  ">
          <Category
            name="Interest"
            count={5}
            idx={1}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Name"
            count={23}
            idx={2}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Email"
            count={2}
            idx={3}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Communities"
            count={2}
            idx={4}
            border={border}
            setBorder={setBorder}
          />
        </div>
        {/* // show search Results */}
        <div className=" h-[60vh] my-3 overflow-y-auto ">
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
          <User name="Jenny James" email="email@gmail.com" img={img1} />
        </div>
      </main>
    </div>
  );
};

type UserType = {
  name: string;
  email: string;
  img: string;
};
const User = ({ name, email, img }: UserType) => {
  return (
    <div className=" cursor-pointer  p-3 flex gap-3 items-center my-3 ">
      <img className=" w-14 h-14 rounded-full object-cover " src={img} alt="" />
      <div>
        <p className="  ">{name}</p>
        <p className=" text-sm text-slate-500 "> {email} </p>
      </div>
    </div>
  );
};

type CategoriesType = {
  name: string;
  count: number;
  idx: number;
  border: number;
  setBorder: (a: number) => void;
};
const Category = ({ name, count, idx, border, setBorder }: CategoriesType) => {
  return (
    <span
      onClick={() => {
        setBorder(idx);
      }}
      className={`  cursor-pointer transition-all  duration-500 flex justify-center items-center text-center min-w-32  py-2 border-b-2 ${
        border === idx ? `border-black` : `border-white`
      }   `}
    >
      {name}
      <span className=" text-xs flex justify-center items-center ml-1 bg-slate-100 w-5 h-5  p-2   rounded-full   ">
        {count}
      </span>
    </span>
  );
};
export default SearchEmployee;
