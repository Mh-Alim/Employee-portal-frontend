import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getTokenFromLocalStorage } from "../utility";
import { debounce } from "../api/Search";
import { useNavigate } from "react-router-dom";

const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const SearchEmployee = () => {
  const [border, setBorder] = useState(1);
  const [results, setResults] = useState([["", "", ""]]);
  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value;

    if (!query) return;

    try {
      let queryParams = "";
      if (border === 1) queryParams = "name";
      if (border === 2) queryParams = "user_email";
      if (border === 3) queryParams = "designation";
      if (border === 4) queryParams = "expertise";

      debounce(query, queryParams, setResults, 500);
    } catch (err) {}
  };

  console.log("results: ", results);
  return (
    <div className=" bg-[#0D1117]   h-[100vh] w-full flex justify-center items-center   ">
      <main className="  w-10/12 sm:w-9/12 lg:w-10/12 bg-glassmorphism text-white rounded-lg   p-1 ">
        {/* search */}
        <form className=" flex items-center s-bg-white p-1 rounded-tl-md rounded-tr-md border-b-slate-500 border-b-2  ">
          <CiSearch className=" ml-2 text-2xl " />
          <input
            className=" pl-4 pr-2 py-2 w-full outline-none  s-bg-white bg-transparent "
            type="text"
            onChange={changeHandler}
          />
        </form>
        {/* heading */}
        <div className=" overflow-scroll flex w-full s-bg-white  ">
          <Category
            name="Name"
            count={5}
            idx={1}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Email"
            count={23}
            idx={2}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Designation"
            count={2}
            idx={3}
            border={border}
            setBorder={setBorder}
          />
          <Category
            name="Expertise"
            count={2}
            idx={4}
            border={border}
            setBorder={setBorder}
          />
        </div>
        {/* // show search Results */}
        <div className=" transition-all duration-1000 h-fit max-h-[40vh] my-3 overflow-y-auto ">
          {results.map(
            (user: string[]) =>
              user[0] && (
                <User
                  key={user[2]}
                  name={`${user[0]} ${user[1]}`}
                  email={user[2]}
                  img={img1}
                />
              )
          )}
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
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        navigate(`/user/search/${email}`);
      }}
      className=" cursor-pointer  p-3 flex gap-3 items-center my-3 "
    >
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
      className={` m-2  cursor-pointer transition-all  duration-500 flex justify-center items-center text-center w-fit py-1 px-2   ${
        border === idx ? ` bg-white rounded-lg text-black ` : `border-slate-600`
      }   `}
    >
      {name}
    </span>
  );
};
export default SearchEmployee;
