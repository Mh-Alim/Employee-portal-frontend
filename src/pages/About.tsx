import React from "react";
import { TbBracketsAngle } from "react-icons/tb";
import { CiLogin } from "react-icons/ci";

const About = () => {
  return (
    <div className="  bg-[#0D1117] w-full ">
      <div className="  p-52 relative ">
        <img
          className=" hue-rotate-[260deg] w-2/4 h-full object-cover object-left  absolute right-0 top-0 z-0 "
          src="https://github.githubassets.com/assets/hero-desktop-a38b0fd77b6c.webp"
          alt=""
        />
        // first
        <div className=" relative ">
          <p className=" rounded-b-xl w-1 h-full absolute -left-10 top-0 timeline bg-[linear-gradient(#0D1117,#08924F)] "></p>
          <h1 className=" relative  text-white z-10 font-work_sans font-extrabold  text-9xl ">
            Welcome to Employees Portal
          </h1>
          <p className=" pb-10 relative z-10 text-3xl text-slate-400 mt-4 ">
            Built this using React, Typescript and Redux{" "}
          </p>
        </div>
        {/* // second  */}
        <div className=" mt-10 relative ">
          <p className=" bg-[#0D1117] text-4xl  absolute -left-16 top-3 z-10 text-white ">
            <CiLogin />
          </p>
          {/* <p className=" rounded-b-xl w-1 h-full absolute -left-10 -bottom-12 bg-[linear-gradient(#0D1117,#8471d5)] "></p> */}
          <p className="  button-shadow  text-white py-4 px-8 rounded-xl bg-[#08924F] w-fit ">
            Sign in for Employee Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
