import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollToTop,
  getEmailFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../utility";
import { addUser } from "../../app/features/userSlice";
import { useAppDispatch } from "../../app/hooks";
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
import { RxCrossCircled, RxResume } from "react-icons/rx";
import { FaFileDownload, FaRegEdit } from "react-icons/fa";

import { LuUser2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { CiCirclePlus } from "react-icons/ci";
import EditModel from "./EditProfile";
import { profileDetailsApi } from "@/api/ProfileDetailsApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Types
import { ProfileDataType, ManagerType, ReporteesType } from "./ProfileTypes";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import Attachment from "./Attachment";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id: ", id);
  const [profileData, setProfileData] = useState<ProfileDataType>({
    firstName: "",
    lastName: "",
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
      console.log("Animesh recievd json ", url);

      const fileResponse = await fetch(url);
      const blob = await fileResponse.blob();

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = "filename.jpg";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getProfileDetails = async (emailId: string) => {
    console.log("emailInRoute: ", emailId);
    const userData = await profileDetailsApi(emailId);
    if (!userData) {
      alert("some error while callingn for profileDetailsApi ");
      return;
    }
    setProfileData(userData);
    if (emailId.length === 0) dispatch(addUser(userData));
  };
  useEffect(() => {
    if (id) getProfileDetails(id);
    else getProfileDetails("");
  }, [id]);

  const [managerInfo, setManagerInfo] = useState<ManagerType>({
    name: "",
    email: "",
  });

  const [reportees, setReportees] = useState<ReporteesType[]>([
    { name: "", email: "" },
  ]);

  console.log("ManagerInfo: ", managerInfo);
  const getManagerAndReportee = async (user_email: string) => {
    const res = await getManagerAndReporteeByEmail(user_email);
    console.log("res: ", res);
    setManagerInfo({
      name: res.manager.first_name,
      email: res.manager.user_email,
    });

    let reportees = res.reportee.map(
      (child: {
        first_name: string;
        user_email: string;
        designation: string;
      }) => {
        return { name: child.first_name, email: child.user_email };
      }
    );
    setReportees(reportees);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    const user_email = id || getEmailFromLocalStorage() || "";
    getManagerAndReportee(user_email);
  }, [pathname, id]);

  return (
    <div
      id="profile"
      className="p-8 md:p-3 text-emerald-50 h-[100vh] overflow-y-scroll relative "
    >
      {TopProfileSection(
        profileData,
        id || getEmailFromLocalStorage() || "",
        managerInfo
      )}

      <section className=" p-5 flex flex-col lg:flex-row  ">
        <div className=" flex-1 flex flex-col  ">
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider flex gap-4 items-center mb-5 text-center sm:text-left ">
              <span>Skills</span>
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
            <div className=" flex gap-5 items-center mb-5 ">
              <h1 className=" text-2xl tracking-wider ">Attachments</h1>
              <p>
                <Attachment route_email={id} />
              </p>
            </div>
            <div className=" flex flex-col flex-wrap ">
              <p
                className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start"
                onClick={handleDownload}
              >
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
                <span
                  onClick={() => navigate(`/user/search/${managerInfo.email}`)}
                >
                  {" "}
                  {managerInfo.name}{" "}
                </span>
              </p>
            </div>
          </div>
          <div className=" m-5 ">
            <h1 className=" text-2xl tracking-wider mb-5 ">Reportee</h1>
            <div className=" flex flex-col flex-wrap  ">
              {reportees.map((rep) => (
                <p
                  key={rep.email}
                  className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start   "
                >
                  <LuUser2 />
                  <span onClick={() => navigate(`/user/search/${rep.email}`)}>
                    {rep.name}{" "}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <EditProfileModel editClickHandler={editClickHandler} /> */}
    </div>
  );
};

const TopProfileSection = (
  profileData: ProfileDataType,
  id: string,
  managerInfo: ManagerType
) => {
  let isAdmin = false;
  let params = false;

  return (
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
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className=" italic mt-3 text-emerald-50 tracking-wider ">
              {profileData.designation}
            </p>
          </div>

          <div className=" flex flex-col md:flex-row md:justify-center   ">
            <div>
              <div className=" m-3 flex gap-1  items-center justify-center md:justify-start ">
                <CiLocationOn />
                <span> Moneyview, Bellandur</span>
              </div>
              <div className=" m-3 flex gap-1  items-center justify-center md:justify-start ">
                <MdLocalPhone />
                <span>{profileData.contact}</span>
              </div>
            </div>
            <div>
              <div className="  m-3 flex gap-1 items-center justify-center md:justify-start ">
                <RiHomeOfficeLine />
                <span>{profileData.pod || "Growth pod"}</span>
              </div>
              <div className=" m-3 flex gap-1 items-center justify-center md:justify-start ">
                <MdOutlineLocalPostOffice />
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-1 md:p-5 flex flex-col md:flex-row justify-between lg:flex-row xl:flex-col  ">
        <div className=" flex gap-5 justify-center  items-center text-xl ">
          <span className=" cursor-pointer ">
            <BsSlack className=" transition-all duration-300 hover:scale-125 " />
          </span>
          <a
            target="_blank"
            href="https://linkedin.com"
            className=" cursor-pointer "
          >
            <IoLogoLinkedin className=" transition-all duration-300 hover:scale-125 " />
          </a>
          <a
            target="_blank"
            href="https://twitter.com"
            className=" cursor-pointer "
          >
            <FaTwitter className=" transition-all duration-300 hover:scale-125 " />
          </a>
          <a
            target="_blank"
            href="https://instagram.com"
            className=" cursor-pointer "
          >
            <AiFillInstagram className=" transition-all duration-300 hover:scale-125 " />
          </a>
        </div>
        <div className=" text-right ">
          {" "}
          <button className="  w-fit p-3 rounded-full bg-[#6e40c9] tracking-wider font-bold   ">
            {" "}
            {(isAdmin || !params) && (
              <EditModel
                manager={managerInfo.email}
                profileData={profileData}
                admin={true}
                name="profle"
                user_email={id}
              />
            )}
          </button>{" "}
        </div>
      </div>
    </section>
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

export default Profile;
