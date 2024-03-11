import { changePasswordApi } from "@/api/ForgetPasswordApi";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const newPassRef = useRef<HTMLInputElement | null>(null);
  const confNewPassRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();



  const location = useLocation();
  const {otp,user_email} = location.state;

  console.log("Otp and user_email: ",otp,user_email);

  useEffect(() => {
    newPassRef.current?.focus();
  }, []);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("coming email: ", newPassRef.current?.value);
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.classList.add("!bg-slate-400");
    }

    const password = newPassRef.current?.value;
    const confNewPassword = confNewPassRef.current?.value;
    if(!password || !confNewPassRef) {
      alert("fill the empty fields");
      return;

    }

    if(password !== confNewPassword) {
      alert("password doesnt match");
      return 
    }

    if(!otp || !user_email) {
      navigate("/forget/email");
      return;
    }
    await changePasswordApi(password,otp,user_email,navigate);

    // await forgetPasswordApi(otpRef.current?.value, navigate);
    // await otpApi(otp,user_email,password,navigate);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
      buttonRef.current.classList.remove("!bg-slate-400");
    }
  };
  return (
    <div className="min-h-[90vh] p-10 sm:p-5 flex justify-center items-center  bg-circule      ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5  flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
          Change Password
        </h1>
        <form
          onSubmit={submitHandler}
          className=" sm:w-96 max-w-96 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg "
        >
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="password"
            placeholder="New password"
            ref={newPassRef}
          />
          <br />
          {/* <label htmlFor="password">Password</label> */}

          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="password"
            placeholder="Confirm new password"
            ref={confNewPassRef}
          />
          <br />

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

export default NewPassword;
