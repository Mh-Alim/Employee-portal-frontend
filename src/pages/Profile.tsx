import React, { useEffect, useState } from "react";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";
import { addUser } from "../app/features/userSlice";
import { useAppDispatch } from "../app/hooks";
import { MdLocalPhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { RiHomeOfficeLine } from "react-icons/ri";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { BsSlack } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdAttachment } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { RxResume } from "react-icons/rx";
import { FaFileDownload } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";

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
      joinedAt: details.dateCreated.substring(0, 10),
    };
    setProfileData(userData);
    dispatch(addUser(userData));
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <div className=" p-5 text-emerald-50 ">
      <section className=" bg-glassmorphism h-72 flex gap-20 justify-between  ">
        <div className=" flex gap-10 ">
          <div className=" object-cover flex justify-center items-center ml-10  ">
            <img
              src="https://cdn4.sharechat.com/img_840073_286c7ec2_1674182835661_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=661_sc.jpg"
              alt="hello"
              className=" rounded-lg w-64 h-64 object-cover  "
            />
          </div>
          <div className=" flex gap-10 pt-5 flex-col  justify-between ">
            <div className=" pl-4 ">
              <h1 className=" text-5xl tracking-wider ">Alim Khan</h1>
              <p className=" mt-5 text-emerald-50 tracking-wider ">
                Software Engineer
              </p>
            </div>

            <div className=" flex gap-10 pb-3 ">
              <div>
                <div className=" m-3 flex gap-1 items-center ">
                  <CiLocationOn />
                  <span>Masjid Road Akaltara</span>
                </div>
                <div className=" m-3 flex gap-1 items-center ">
                  <MdLocalPhone />
                  <span>7489167363</span>
                </div>
              </div>
              <div>
                <div className="  m-3 flex gap-1 items-center ">
                  <RiHomeOfficeLine />
                  <span>Growth Pod</span>
                </div>
                <div className=" m-3 flex gap-1 items-center ">
                  <MdOutlineLocalPostOffice />
                  <span>alim.khan@moneyview.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-5 flex flex-col justify-between  ">
          <div className=" flex gap-5 text-xl ">
            <span className=" cursor-pointer ">
              <BsSlack />
            </span>
            <span className=" cursor-pointer ">
              <IoLogoLinkedin />
            </span>
            <span className=" cursor-pointer ">
              <FaTwitter />
            </span>
            <span className=" cursor-pointer ">
              <AiFillInstagram />
            </span>
          </div>
          <div className=" text-right ">
            {" "}
            <button className="  w-fit px-4 py-1 bg-[#6e40c9] tracking-wider font-bold rounded-lg  ">
              {" "}
              Edit{" "}
            </button>{" "}
          </div>
        </div>
      </section>

      <section className=" p-5 flex ">
        <div className=" flex-1 flex flex-col  ">
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 "> Skills </h1>
            <div className=" flex flex-wrap ">
              <p className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Frontend Developement
              </p>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Backend Developement
              </span>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Node Js Developer
              </span>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Mern Developer
              </span>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Mean Developer
              </span>
            </div>
          </div>
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 "> Languages </h1>
            <div className=" flex flex-wrap ">
              <p className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                English
              </p>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Hindi
              </span>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Spanish
              </span>
            </div>
          </div>

          {/* sector of expertise  */}
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">
              {" "}
              Sector of Interests{" "}
            </h1>
            <div className=" flex flex-wrap ">
              <p className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Cricket
              </p>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Socker
              </span>
              <span className=" m-2  py-2 px-4 bg-purple-500 rounded-lg ">
                Chess
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col flex-1 ">
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Attachments</h1>
            <div className=" flex flex-col flex-wrap ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center  ">
                <MdHomeRepairService />
                <span>OfferLetter.pdf </span>
              </p>
              <p className=" cursor-pointer px-4 flex gap-2 items-center ">
                <RxResume /> <span>Resume.pdf</span>{" "}
              </p>
              <p className="  cursor-pointer py-2 px-4 flex gap-2 items-center ">
                <FaFileDownload />
                <span>fs.pdf</span>
              </p>
            </div>
          </div>

          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Manager</h1>
            <div className=" flex flex-col flex-wrap ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center  ">
                <FaUserTie />
                <span>Abhishek </span>
              </p>
            </div>
          </div>
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Reportee</h1>
            <div className=" flex flex-col flex-wrap ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center  ">
                <LuUser2 />
                <span>Animesh </span>
              </p>
              <p className=" cursor-pointer px-4 flex gap-2 items-center ">
                <LuUser2 /> <span>Tarun Jayadevan</span>{" "}
              </p>
              <p className="  cursor-pointer py-2 px-4 flex gap-2 items-center ">
                <LuUser2 />
                <span>Anurag Rout</span>
              </p>
            </div>
          </div>
        </div>
      </section>
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
