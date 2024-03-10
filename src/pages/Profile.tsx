import React, { useEffect, useRef, useState } from "react";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";
import { addUser } from "../app/features/userSlice";
import { useAppDispatch } from "../app/hooks";
import { MdLocalPhone } from "react-icons/md";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { RiHomeOfficeLine } from "react-icons/ri";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { BsSlack } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter, FaUserTie } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdAttachment } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { RxResume } from "react-icons/rx";
import { FaFileDownload, FaRegEdit } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

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

  const handleDownload = async () => {
    try {
      console.log("Animesh here starting");
      const options = {
        method: "GET",
      };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/downloadCheck`,
        options
      );
      const { url } = await res.json();
      console.log("Animesh recievd json ",url);

      const fileResponse = await fetch(url);
      const blob = await fileResponse.blob();

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = 'filename.jpg';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const modelRef = useRef(null);
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

  const editClickHandler = () => {
    const dialog = document.querySelector("#model");
    dialog?.classList.toggle("!z-10");
    dialog?.classList.toggle("!opacity-100");
    dialog?.classList.toggle("!scale-100");
  };
  return (
    <div className="p-8 md:p-3 text-emerald-50 h-[100vh] overflow-y-scroll relative ">
      <section className=" bg-glassmorphism min-h-72 flex flex-col gap-1  2xl:gap-20 justify-between md:flex-col xl:flex-row   ">
        <div className=" flex flex-col gap-5 lg:flex-row p-5 ">
          <div className=" object-cover flex justify-center items-center mt-5    ">
            <img
              src="https://cdn4.sharechat.com/img_840073_286c7ec2_1674182835661_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=661_sc.jpg"
              alt="hello"
              className=" rounded-lg w-64 h-64 object-cover  "
            />
          </div>
          <div className=" flex gap-5 pt-5 flex-col  justify-between text-center lg:text-left  ">
            <div className=" pl-4 ">
              <h1 className=" text-5xl tracking-wider font-work_sans font-bold ">
                Alim Khan
              </h1>
              <p className=" italic mt-3 text-emerald-50 tracking-wider ">
                Software Engineer
              </p>
            </div>

            <div className=" flex flex-col md:flex-row md:justify-center   ">
              <div>
                <div className=" m-3 flex gap-1  items-center justify-center md:justify-start ">
                  <CiLocationOn />
                  <span>Masjid Road Akaltara</span>
                </div>
                <div className=" m-3 flex gap-1  items-center justify-center md:justify-start ">
                  <MdLocalPhone />
                  <span>7489167363</span>
                </div>
              </div>
              <div>
                <div className="  m-3 flex gap-1 items-center justify-center md:justify-start ">
                  <RiHomeOfficeLine />
                  <span>Growth Pod</span>
                </div>
                <div className=" m-3 flex gap-1 items-center justify-center md:justify-start ">
                  <MdOutlineLocalPostOffice />
                  <span>alim.khan@moneyview.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-1 md:p-5 flex flex-col md:flex-row justify-between lg:flex-row xl:flex-col  ">
          <div className=" flex gap-5 justify-center  items-center text-xl ">
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
            <button
              onClick={editClickHandler}
              className="  w-fit p-3 rounded-full bg-[#6e40c9] tracking-wider font-bold   "
            >
              {" "}
              <FaRegEdit />{" "}
            </button>{" "}
          </div>
        </div>
      </section>

      <section className=" p-5 flex flex-col lg:flex-row  ">
        <div className=" flex-1 flex flex-col  ">
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 text-center sm:text-left ">
              Skills
            </h1>
            <div className=" flex flex-wrap justify-center sm:justify-start  ">
              <p className=" m-2  py-2 px-4 bg-purple-500 rounded-lg  ">
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
          <div className=" m-5 text-center sm:text-left ">
            <h1 className=" text-2xl tracking-wider mb-5 "> Languages </h1>
            <div className=" flex flex-wrap justify-center sm:justify-start ">
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
          <div className=" m-5 text-center sm:text-left ">
            <h1 className=" text-2xl tracking-wider mb-5 ">
              {" "}
              Sector of Interests{" "}
            </h1>
            <div className=" flex flex-wrap justify-center sm:justify-start ">
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
        <div className=" flex flex-col flex-1 text-center sm:text-left ">
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Attachments</h1>
            <div className=" flex flex-col flex-wrap ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start" onClick={handleDownload}>
                <MdHomeRepairService />
                <span>OfferLetter.pdf </span>
              </p>
              <p className=" cursor-pointer px-4 flex gap-2 items-center justify-center sm:justify-start  ">
                <RxResume /> <span>Resume.pdf</span>{" "}
              </p>
              <p className="  cursor-pointer py-2 px-4 flex gap-2 items-center justify-center sm:justify-start  ">
                <FaFileDownload />
                <span>fs.pdf</span>
              </p>
            </div>
          </div>
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Manager</h1>
            <div className=" flex flex-col flex-wrap ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start   ">
                <FaUserTie />
                <span>Abhishek </span>
              </p>
            </div>
          </div>
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Reportee</h1>
            <div className=" flex flex-col flex-wrap  ">
              <p className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start   ">
                <LuUser2 />
                <span>Animesh </span>
              </p>
              <p className=" cursor-pointer px-4 flex gap-2 items-center justify-center sm:justify-start  ">
                <LuUser2 /> <span>Tarun Jayadevan</span>{" "}
              </p>
              <p className="  cursor-pointer py-2 px-4 flex gap-2 items-center justify-center sm:justify-start  ">
                <LuUser2 />
                <span>Anurag Rout</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <EditProfileModel editClickHandler={editClickHandler} />
    </div>
  );
};

type EditProfileModelType = {
  editClickHandler: () => void;
};
const EditProfileModel = ({ editClickHandler }: EditProfileModelType) => {
  return (
    <div
      id="model"
      className=" absolute top-1/4 left-1/4 min-w-96 min-h-96 bg-slate-800 transition-transform duration-300 px-8 z-[-1] opacity-0 rounded-lg scale-50 backdrop-blur-md "
    >
      <div>
        <p className=" flex justify-end text-3xl py-2  ">
          <RxCross2 className=" cursor-pointer " onClick={editClickHandler} />
        </p>
        <form className="  py-5 " action="">
          <div className=" flex items-center s-bg-white p-1 ro rounded-md outline mb-6  ">
            <MdLocalPhone className=" ml-2 text-2xl " />
            <input
              className=" pl-4 pr-2 py-1 w-full outline-none remove-arrow  s-bg-white bg-transparent "
              type="number"
              placeholder="phone number"
            />
          </div>

          <div className=" flex items-center s-bg-white p-1 ro rounded-md outline mb-6  ">
            <FaTwitter className=" ml-2 text-2xl " />
            <input
              className=" pl-4 pr-2 py-1 w-full outline-none  s-bg-white bg-transparent "
              type="text"
              placeholder="profile link"
            />
          </div>

          <div className=" flex items-center s-bg-white p-1 ro rounded-md outline mb-6  ">
            <IoLogoLinkedin className=" ml-2 text-2xl " />
            <input
              className=" pl-4 pr-2 py-1 w-full outline-none  s-bg-white bg-transparent "
              type="text"
              placeholder="profile link"
            />
          </div>

          <div className=" flex items-center s-bg-white p-1 ro rounded-md outline mb-6  ">
            <BsSlack className=" ml-2 text-2xl " />
            <input
              className=" pl-4 pr-2 py-1 w-full outline-none  s-bg-white bg-transparent "
              type="text"
              placeholder="profile link"
            />
          </div>

          <div className=" flex items-center s-bg-white p-1 ro rounded-md outline mb-6  ">
            <AiFillInstagram className=" ml-2 text-2xl " />
            <input
              className=" pl-4 pr-2 py-1 w-full outline-none  s-bg-white bg-transparent "
              type="text"
              placeholder="profile link"
            />
          </div>
        </form>
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
