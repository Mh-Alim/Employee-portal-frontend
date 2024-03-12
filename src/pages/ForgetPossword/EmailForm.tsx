import { forgetPasswordApi } from "@/api/ForgetPasswordApi";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailForm = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;

    if (!email) {
      alert("fill email")
      return;
    }

    setShowMessage(true);

    console.log("coming email: ", emailRef.current?.value);
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.classList.add("!bg-slate-400");
    }
    await forgetPasswordApi(email, navigate);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
      buttonRef.current.classList.remove("!bg-slate-400");
    }
    setShowMessage(false);
  };

  return (
    <div className="min-h-[90vh] p-10 sm:p-5 flex justify-center items-center   bg-circule     ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5  flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
          Enter Your Email
        </h1>
        <form
          onSubmit={submitHandler}
          className=" sm:w-96 max-w-96 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg "
        >
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <br />
          {/* <label htmlFor="password">Password</label> */}

          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <button
              type="submit"
              className=" px-10  py-2 text-slate-500 bg-white-500 bg-white rounded-3xl "
              ref={buttonRef}
            >
              Enter
            </button>
          </div>
        </form>
        {
          <p
            className={`text-slate-400 tracking-wider ${
              !showMessage ? "hidden" : "block"
            } `}
          >
            Check Mail for otp
          </p>
        }
      </div>
    </div>
  );
};

export default EmailForm;
