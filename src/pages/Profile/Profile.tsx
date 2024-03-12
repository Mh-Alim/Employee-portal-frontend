import React, { useEffect, useState } from "react";
import { getEmailFromLocalStorage } from "../../utility";
import { addUser } from "../../app/features/userSlice";
import { useAppDispatch } from "../../app/hooks";

import { profileDetailsApi } from "@/api/ProfileDetailsApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Icons
import { FaUserTie } from "react-icons/fa6";
import { MdHomeRepairService } from "react-icons/md";
import { RxResume } from "react-icons/rx";
import { FaFileDownload } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";

// Types
import { ProfileDataType, ManagerType, ReporteesType } from "./ProfileTypes";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import Attachment from "./Attachment";
import TopProfileSection from "./TopProfileSection";
import ApiToCsvConverter from "@/components/ApiToCsvConverter";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [profileData, setProfileData] = useState<ProfileDataType>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    designation: "",
    emp_id: "",
    joinedAt: "",
    skills: [""],
    languages: [""],
    interests: [""],
    slackUrl: "",
    instaUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    profileImageUrl: "",
    offerLetter: {
      name: "",
      url: "",
    },
  });

  const handleDownload = async (url: string) => {
    try {
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

  const getManagerAndReportee = async (user_email: string) => {
    const res = await getManagerAndReporteeByEmail(user_email);
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
              {profileData.skills?.map((skill) => (
                <p
                  key={skill}
                  className=" m-2  py-2 px-4 bg-purple-500 rounded-lg  "
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
          <div className=" m-5 text-center sm:text-left ">
            <h1 className=" text-2xl tracking-wider mb-5 "> Languages </h1>
            <div className=" flex flex-wrap justify-center sm:justify-start ">
              {profileData.languages?.map((language) => (
                <p
                  key={language}
                  className=" m-2  py-2 px-4 bg-purple-500 rounded-lg "
                >
                  {language}
                </p>
              ))}
            </div>
          </div>

          {/* sector of expertise  */}
          <div className=" m-5 text-center sm:text-left ">
            <h1 className=" text-2xl tracking-wider mb-5 ">
              {" "}
              Sector of Interests{" "}
            </h1>
            <div className=" flex flex-wrap justify-center sm:justify-start ">
              {profileData.interests?.map((interest) => (
                <p
                  key={interest}
                  className=" m-2  py-2 px-4 bg-purple-500 rounded-lg "
                >
                  {interest}
                </p>
              ))}
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
                onClick={() => handleDownload(profileData.offerLetter.url)}
              >
                <MdHomeRepairService />
                <span> {profileData.offerLetter.name}</span>
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
      <button onClick={() => navigate("/tree-view")}>TreeView</button>
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

export default Profile;
