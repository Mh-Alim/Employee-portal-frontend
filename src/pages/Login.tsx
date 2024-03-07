import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const user_email = emailRef.current?.value;
      const password = passRef.current?.value;
      console.log(emailRef, password);

      if (!user_email || !password) return alert("Fill the form");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email, password }), // Convert data to JSON string
      };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        options
      );
      const json = await res.json();
      localStorage.setItem("token", json.data);
      navigate("/user/profile");
    } catch (err) {
      alert("some error in login ");
      console.log("err: ", err);
    }
  };
  return (
    <div className="min-h-[100vh] p-10 sm:p-5 flex justify-center items-center  bg-[#3E3E66]  ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5 bg-[#0F102B] flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
          Login
        </h1>
        <form
          onSubmit={submitHandler}
          className=" sm:w-96 max-w-96 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg "
        >
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 p-2 w-full  outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            id="password"
            type="password"
            placeholder="Password"
            ref={passRef}
          />
          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <button
              type="submit"
              className=" px-10  py-2 text-slate-500 bg-white-500 bg-white rounded-3xl "
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
