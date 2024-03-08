import React, { useEffect, useState } from "react";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";
import { addUser } from "../app/features/userSlice";
import { useAppDispatch } from "../app/hooks";

type ProfileDataType = {
  name: string;
  email: string;
  contact: number;
  emp_id: number;
  designation: string;
  joinedAt: string;
};
const Profile = () => {
  const dispatch = useAppDispatch();
  const [showDetials, setShowDetails] = useState(true);
  const [profileData, setProfileData] = useState<ProfileDataType>({
    name: "",
    email: "",
    contact: 0,
    emp_id: 0,
    designation: "",
    joinedAt: "",
  });

  const getProfileDetails = async () => {
    let user_email = getEmailFromLocalStorage();
    let token = getTokenFromLocalStorage();
    if (!token || !user_email) {
      alert("Login to access this resource");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ user_email, requested_user_email: user_email }), // Convert data to JSON string
    };
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/getByUserEmail`,
      options
    );
    const json = await res.json();
    const details = json.data;
    

    const userData = {
      name: `${details.firstName} ${details.lastName}`,
      email: details.userEmail,
      contact: details.contactNumber,
      designation: details.designation,
      emp_id: details.empCode,
      joinedAt: details.dateCreated.substring(0,10),
    }
    setProfileData(userData);
    dispatch(addUser(userData))
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <div className=" p-5 w-full h-[100vh] text-white flex justify-center flex-col items-center overflow-y-scroll ">
      <div className=" w-full sm:w-8/12 md:w-11/12 lg:w-8/12  h-5/6 bg-slate-600 rounded-lg ">
        <div className=" w-full h-1/3 bg-slate-800 rounded-t-lg  "></div>
        <p className=" flex justify-center items-center  ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1SdQtedd5Hf2MSihKD3frREpjMZrfVAufDw&usqp=CAU"
            alt=""
            className=" w-28 rounded-full relative -top-10 z-0 "
          />
        </p>
        <div className=" mb-2 flex justify-center gap-3 ">
          <p
            onClick={() => setShowDetails((prev) => !prev)}
            className={`transition-all duration-500 ${
              showDetials ? "text-blue-300" : "text-slate-500"
            }  font-work_sans cursor-pointer `}
          >
            Details
          </p>
          <p
            onClick={() => setShowDetails((prev) => !prev)}
            className={`transition-all duration-500 ${
              !showDetials ? "text-blue-300" : "text-slate-700"
            }  font-work_sans cursor-pointer `}
          >
            Images
          </p>
        </div>

        {showDetials ? (
          <div className=" w-full p-5 ">
            <Details keyName="Name" name={profileData.name} />
            <Details keyName="Email" name={profileData.email} />
            <Details keyName="Contact " name={profileData.contact} />
            <hr className=" my-5 border-dashed  " />
            <Details keyName="Employee id " name={profileData.emp_id} />
            <Details keyName="Designation " name={profileData.designation} />
            <Details keyName="JoinedAt" name={profileData.joinedAt} />
          </div>
        ) : (
          <div className=" p-5 flex justify-center flex-wrap gap-4 w-full h-[28vh] overflow-y-scroll ">
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
            <Image />
          </div>
        )}
      </div>
      <div className=" mt-3 mx-auto  px-6 py-2 bg-blue-500 w-fit rounded-lg ">
        Edit Profile
      </div>
    </div>
  );
};

const Image = () => {
  return (
    <div className="">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1SdQtedd5Hf2MSihKD3frREpjMZrfVAufDw&usqp=CAU"
        alt=""
        className=" w-24 rounded-full "
      />
    </div>
  );
};

type DetailsType = {
  keyName: string;
  name: string | number;
};
const Details = ({ keyName, name }: DetailsType) => {
  return (
    <div className="  flex justify-between gap-8 ">
      <p>{keyName} </p>
      <p>{name}</p>
    </div>
  );
};

export default Profile;