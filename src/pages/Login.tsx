import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

type TextFieldsType = {
  email: string;
  password: String;
};
const Login = () => {
  const [textFields, setTextFields] = useState<TextFieldsType>({
    email: "",
    password: "",
  });
  return (
    <div className="min-h-[100vh] p-10 sm:p-5 flex justify-center items-center  bg-[#3E3E66]  ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5 bg-[#0F102B] flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
          Login
        </h1>
        <main className=" sm:w-96 max-w-96 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg ">
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTextFields((prev: TextFieldsType) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 p-2 w-full  outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTextFields((prev: TextFieldsType) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <p className=" px-10  py-2 text-slate-500 bg-white-500 bg-white rounded-3xl ">
              Log in
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
