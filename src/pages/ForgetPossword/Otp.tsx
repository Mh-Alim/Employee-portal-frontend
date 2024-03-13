import { otpApi } from "@/api/ForgetPasswordApi";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const otpRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    otpRef.current?.focus();
  }, []);

  const location = useLocation();
  const { user_email } = location.state;
  console.log("user_email_in_state ", user_email);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("coming email: ", otpRef.current?.value);
    const otp = otpRef.current?.value;

    if (!user_email) {
      navigate("/forget/email");
      return;
    }
    if (!otp) {
      alert("OTP is not present");
      return;
    }

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.classList.add("!bg-slate-400");
    }

    // await forgetPasswordApi(otpRef.current?.value, navigate);
    await otpApi(otp, user_email, navigate);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
      buttonRef.current.classList.remove("!bg-slate-400");
    }
  };
  return (
    <div className="min-h-[90vh] p-10 sm:p-5 flex justify-center items-center   bg-circule-after bg-circule-before    ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5  flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <form
          onSubmit={submitHandler}
          className=" sm:w-96 max-w-96 bg-glassmorphism relative z-10 flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg "
        >
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2 remove-arrow   border-slate-500 rounded-lg bg-transparent"
            id="email"
            type="number"
            placeholder="OTP"
            ref={otpRef}
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
      </div>
    </div>
  );
};

export default Otp;
