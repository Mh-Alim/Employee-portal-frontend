import React, { useRef, useState } from "react";
import { addEmployeeApi } from "../api/AddEmployee";

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
    <div className="h-[100vh] p-10 sm:p-5 flex justify-center items-center overflow-y-scroll   ">
      {/*  */}
      <div className=" gap-7 p-5 sm:p-5  flex flex-col  justify-center items-center rounded-lg min-h-[80vh] w-[90vw] ">
        <form
          onSubmit={submitHandler}
          className=" h-[60vh] overflow-y-scroll  md:w-3/4 lg:w-3/5 xl:w-3/6 bg-glassmorphism flex flex-col  shadow-slate-400 text-white  shadow-lg min-h-[30vh] p-10 sm:p-6 md:p-10 rounded-lg "
        >
          <h1 className="  text-white  text-center uppercase tracking-wide font-medium text-3xl ">
            Employee details
          </h1>
          <br />
          {/* <label htmlFor="email">Email</label> */}
          <div className=" flex justify-between items-center gap-5 ">
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
            className="mb-5 w-full p-2 outline-none border-2   border-slate-500 rounded-lg bg-transparent"
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

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <br />
          {/* {fileUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <p>File URL: {fileUrl}</p>
          <img src={fileUrl} alt="Uploaded file" />
        </div> */}
          {/* )} */}

          <div className=" cursor-pointer mt-5 flex items-center justify-center ">
            <button
              type="submit"
              className=" px-10  py-2 text-slate-500 bg-white-500 bg-white rounded-3xl "
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
