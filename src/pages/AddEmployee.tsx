import React from "react";

type EmployeeType = {
  name: string;
  email: string;
  password: string;
  designation: string;
  level: string;
  dob: string;
  manger: string;
};
const AddEmployee = () => {
  return (
    <div className="min-h-[100vh] p-10 sm:p-5 flex justify-center items-center  bg-[#3E3E66]  ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5 bg-[#0F102B] flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
          Employee details
        </h1>
        <main className=" w-full md:w-3/4 lg:w-3/5 xl:w-3/6 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg ">
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="string"
            placeholder="Name"
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="string"
            placeholder="Designation"
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="string"
            placeholder="Level"
          />
          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 p-2 w-full  outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="date"
            placeholder="MM/DD/YYYY"
          />

          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 p-2 w-full  outline-none border-2 bg-[#434459] border-slate-500 rounded-sm"
            type="string"
            placeholder="Manager"
          />

          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <p className=" px-10  py-2 text-slate-500 bg-white-500 bg-white rounded-3xl ">
              Enter
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEmployee;
