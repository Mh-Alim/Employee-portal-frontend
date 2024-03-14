import React, { useEffect, useState } from "react";
import { getEmailFromLocalStorage } from "../../utility";
import { addUser } from "../../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { profileDetailsApi } from "@/api/ProfileDetailsApi";
import {
  useLocation,
  useNavigate,
  useParams,
  useRouteError,
} from "react-router-dom";
// Icons
import { FaUserTie } from "react-icons/fa6";
import { MdHomeRepairService } from "react-icons/md";
import { RxResume } from "react-icons/rx";
import { FaFileDownload } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";

// Types
import {
  ProfileDataType,
  ManagerType,
  ReporteesType,
  AttachmentDocumentType,
} from "./ProfileTypes";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import Attachment from "./Attachment";
import TopProfileSection from "./TopProfileSection";
import ApiToCsvConverter from "@/components/ApiToCsvConverter";
import { useRouteToLogin } from "@/customHook/useRouteToLogin";
import { ToastCallError } from "@/ReactToast";
import { useStateLoad } from "@/customHook/useStateLoad";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const [renderProfileFlag, setRenderProfileFlag] = useState(true);

  const { email, isAdmin } = useAppSelector((state) => state.user);

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
    profileImageUrl: null,
    documents: [
      {
        name: "",
        url: "",
      },
    ],
    isAdmin: false,
    pod: null,
    dob: null
  });

  useRouteToLogin();

  useStateLoad(pathname);

  const handleDownload = async (url: string) => {
    try {
      console.log("Downloading url is ", url);
      const fileResponse = await fetch(url);
      const blob = await fileResponse.blob();

      const blobUrl = URL.createObjectURL(blob);

      const filename = url.substring(url.lastIndexOf("/") + 1); // Extract filename from URL

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getProfileDetails = async (
    emailId: string,
    locState?: undefined | { isSearched: boolean }
  ) => {
    let isSearched = false;
    if (locState && locState.isSearched) isSearched = true;

    const userData = await profileDetailsApi(emailId, isSearched);
    if (!userData) {
      return;
    }
    setProfileData(userData);
    if (emailId.length === 0) dispatch(addUser(userData));
  };
  useEffect(() => {
    if (id) getProfileDetails(id, state);
    else getProfileDetails("");
  }, [id, renderProfileFlag, pathname]);

  const [managerInfo, setManagerInfo] = useState<ManagerType>({
    name: "",
    email: "",
  });

  const [reportees, setReportees] = useState<ReporteesType[]>([
    { name: "", email: "" },
  ]);

  const getManagerAndReportee = async (user_email: string) => {
    const res = await getManagerAndReporteeByEmail(user_email);

    console.log("res of getManager and Reportee: ", res);
    setManagerInfo({
      name: res.manager?.first_name,
      email: res.manager?.user_email,
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

  
          // };


  useEffect(() => {
    const user_email = id || getEmailFromLocalStorage();
    console.log("user email is: ", user_email);
    if (user_email) getManagerAndReportee(user_email);
  }, [pathname, id]);

  console.log("Manager info: ", managerInfo);

  const { isDark } = useAppSelector((state) => state.toggle);

  return (
    <div
      id="profile"
      className="p-8 md:p-3 text-emerald-50 h-[100vh] overflow-y-scroll relative "
    >
      {TopProfileSection(
        profileData,
        id || getEmailFromLocalStorage() || "",
        managerInfo,
        setRenderProfileFlag,
        pathname,
        id
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
                  className={` m-2  py-2 px-4 cursor-pointer ${
                    isDark ? "bg-purple-500" : "bg-blue-600"
                  }  rounded-lg  `}
                  onClick={() => {
                    navigate(`/user/search?skill=${skill}`);
                  }}
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
                  className=" m-2 cursor-pointer  py-2 px-4 bg-purple-500 rounded-lg "
                  onClick={() => {
                    navigate(`/user/search?language=${language}`);
                  }}
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
                  className=" cursor-pointer  m-2  py-2 px-4 bg-purple-500 rounded-lg "
                  onClick={() => {
                    navigate(`/user/search?interest=${interest}`);
                  }}
                >
                  {interest}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-col flex-1 text-center sm:text-left ">
          {(profileData.email === email || isAdmin) && (
            <div className=" m-5 ">
              <div className=" flex gap-5 items-center mb-5 ">
                <h1 className=" text-2xl tracking-wider ">Attachments</h1>
                {isAdmin && (
                  <p>
                    <Attachment
                      setRenderProfileFlag={setRenderProfileFlag}
                      route_email={id}
                    />
                  </p>
                )}
              </div>
              <div className=" flex flex-col flex-wrap ">
                {profileData.documents.map((e, idx) => {
                  console.log("e: ", e);
                  return e.name.length ? (
                    <Document
                      key={idx}
                      name={e.name}
                      url={e.url}
                      handleDownload={handleDownload}
                    />
                  ) : null;
                })}
              </div>
            </div>
          )}

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
          {/* <div className="d-flex justify-content-end mb-4">
                  <input type="file" accept=".json" className="btn btn-primary" onChange={handleFileUpload} />
                </div> */}
        </div>
      </section>
      {/* <EditProfileModel editClickHandler={editClickHandler} /> */}
    </div>
  );
};

const Document = ({ name, url, handleDownload }: AttachmentDocumentType) => {
  return (
    <p
      className=" cursor-pointer  py-2 px-4 flex gap-2 items-center justify-center sm:justify-start"
      onClick={() => handleDownload(url)}
    >
      <FaFileDownload />
      <span> {name}</span>
    </p>
  );
};
export default Profile;
