import React, { useRef, useState } from "react";
import { addEmployeeApi } from "../api/AddEmployee";
import { MdCloudUpload } from "react-icons/md";

const AddEmployee = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const selectedFile = useRef<File | null>(null);
  // const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fnameRef = useRef<HTMLInputElement | null>(null);
  const lnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const designationRef = useRef<HTMLInputElement | null>(null);
  const empCodeRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const dobRef = useRef<HTMLInputElement | null>(null);
  const managerEmailRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const first_name = fnameRef.current?.value;
    const last_name = lnameRef.current?.value;
    const user_email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const designation = designationRef.current?.value;
    const emp_code = empCodeRef.current?.value;
    const contact_number = contactRef.current?.value;
    const dob = dobRef.current?.value;
    const manager_email = managerEmailRef.current?.value;

    if (
      !first_name ||
      !last_name ||
      !user_email ||
      !password ||
      !designation ||
      !emp_code ||
      !contact_number ||
      !dob ||
      !manager_email
    ) {
      alert("fill the empty fields");
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.set("file", selectedFile);
    }

    const data = {
      first_name,
      last_name,
      user_email,
      password,
      emp_code,
      designation,
      contact_number,
      manager_email,
      dob,
    };

    addEmployeeApi(data, formData);
  };

  return (
    <div className=" m-10  sm:p-10  flex justify-center items-center relative bg-circule-after bg-circule-before no-scrollbar    ">
      {/* <div className=" bg-circule m-10 p-10 sm:p-5 flex justify-center items-center "> */}
      {/*  */}
      <div className=" h-[90vh] overflow-y-scroll w-full   gap-7 p-2 sm:p-5  flex flex-col  justify-center items-center rounded-lg bg-glassmorphism  relative z-50  ">
        <form
          onSubmit={submitHandler}
          className=" py-5 w-full md:w-4/4 lg:w-5/5 xl:w-3/6  flex flex-col   text-white min-h-[30vh] p-4 sm:p-6 md:p-10 rounded-lg  "
        >
          <h1 className="  mb-5 text-white  text-center uppercase tracking-wide font-medium text-3xl ">
            Employee details
          </h1>
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <div className=" flex flex-col md:flex-row justify-between items-center gap-5 ">
            <input
              className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
              type="string"
              placeholder="First Name"
              ref={fnameRef}
            />
            <input
              className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
              type="string"
              placeholder="Last Name"
              ref={lnameRef}
            />
          </div>

          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="text"
            placeholder="Designation"
            ref={designationRef}
          />
          <br />
          <input
            className="mb-5 w-full p-2 outline-none border-2  remove-arrow  border-slate-500 rounded-lg bg-transparent"
            type="number"
            placeholder="Employee Code"
            ref={empCodeRef}
          />
          <br />

          <input
            className="mb-5 w-full p-2 outline-none border-2 remove-arrow   border-slate-500 rounded-lg bg-transparent"
            type="number"
            placeholder="Contact Number"
            ref={contactRef}
          />

          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 w-full p-5 outline-none border-2   border-slate-500 text-white rounded-lg bg-transparent"
            type="date"
            placeholder="MM/DD/YYYY"
            ref={dobRef}
          />

          <br />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
            type="email"
            placeholder="Manager Email"
            ref={managerEmailRef}
          />

          <br />
          <div className="mb-5 w-full p-2 outline-none border-2    border-slate-500 rounded-lg bg-transparent">
            <label
              htmlFor="profile-pic"
              className=" px-2 cursor-pointer flex gap-3 items-center "
            >
              <span>
                {" "}
                <MdCloudUpload className=" text-2xl " />
              </span>{" "}
              <span>Profile Picture</span>
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              name="profile-pic"
              placeholder="choose profile pic"
              id="profile-pic"
              className=" hidden "
            />
          </div>

          <br />

          <button
            type="submit"
            className=" px-10  py-2 mb-5 text-slate-500 bg-white-500  bg-white rounded-3xl "
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
