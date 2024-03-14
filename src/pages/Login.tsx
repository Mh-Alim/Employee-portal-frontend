import { ToastCallError } from "@/ReactToast";
import { isLoggedIn, loginApi } from "@/api/LoginApi";
import { useAppSelector } from "@/app/hooks";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { isDark } = useAppSelector((state) => state.toggle);

  const isLoggedInRes = async () => {
    const res = await isLoggedIn();
    if (res) {
      navigate("/user/profile");
      return;
    }
  };
  useEffect(() => {
    isLoggedInRes();
  }, []);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (buttonRef.current) buttonRef.current.disabled = true;

      const user_email = emailRef.current?.value;
      const password = passRef.current?.value;

      if (!user_email || !password) {
        ToastCallError("Empty fields");
        if (buttonRef.current) buttonRef.current.disabled = false;
        return;
      }

      await loginApi(user_email, password);

      if (buttonRef.current) buttonRef.current.disabled = false;
      navigate("/user/profile");
    } catch (err) {
      if (buttonRef.current) buttonRef.current.disabled = false;
      console.log("err: ", err);
    }
  };

  return (
    <div className="min-h-[90vh] p-10 sm:p-5 flex justify-center items-center  bg-circule-after bg-circule-before     ">
      {/*  */}

      <div className=" gap-7 p-5 sm:p-5  flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1
          className={` ${
            isDark ? "text-white" : "text-black"
          }    text-center uppercase tracking-wide font-medium text-3xl `}
        >
          Login
        </h1>
        <form
          onSubmit={submitHandler}
          className={` sm:w-96 max-w-96 relative z-20 bg-glassmorphism flex flex-col  shadow-slate-400 ${
            isDark ? "text-white" : "text-black"
          } shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg `}
        >
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <br />
          <input
            className="mb-5 p-2 w-full  outline-none border-2  border-slate-500 rounded-lg bg-transparent"
            id="password"
            type="password"
            placeholder="Password"
            ref={passRef}
          />
          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <button
              type="submit"
              className={` px-10  py-2 text-slate-500 bg-white-500 ${
                isDark ? "bg-white" : "text-white bg-purple-500 "
              } rounded-3xl `}
              ref={buttonRef}
            >
              Log in
            </button>
          </div>
        </form>
        <p
          className={` ${isDark ? "text-white" : "text-black"} cursor-pointer `}
          onClick={() => navigate("/forget/email")}
        >
          Forget Password
        </p>
      </div>
    </div>
  );
};

export default Login;
