import { AiFillInstagram } from "react-icons/ai";
import { BsSlack } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdLocalPhone, MdOutlineLocalPostOffice } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";
import EditModel from "./EditProfile";
import { ManagerType, ProfileDataType } from "./ProfileTypes";
import { TiUser } from "react-icons/ti";
import ApiToCsvConverter from "@/components/ApiToCsvConverter";
import { useEffect, useState } from "react";
import { getEmailFromLocalStorage } from "@/utility";
import { useAppSelector } from "@/app/hooks";

const defaultImg =
  "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1455022237/iehclnpgv6qezeblmbij.png";
const TopProfileSection = (
  profileData: ProfileDataType,
  id: string,
  managerInfo: ManagerType,
  setRenderProfileFlag: any,
  pathname: any
) => {
  // let isAdmin = false;
  let params = false;

  const { email, isAdmin } = useAppSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);

  const [selfEmail, setSelfEmail] = useState<string | null>(null);

  useEffect(() => {
    console.log("mySeflEmaiil from top profile section :", selfEmail);
    setAdmin(isAdmin);
    setSelfEmail(email);
  }, [email, pathname, isAdmin]);

  console.log("inside top profile data: ", profileData);
  return (
    <section className=" bg-glassmorphism min-h-7  flex flex-col gap-1  2xl:gap-20 justify-between md:flex-col xl:flex-row   ">
      <div className=" flex flex-col gap-5 lg:flex-row p-5 ">
        <div className=" object-cover flex justify-center items-center mt-5    ">
          <img
            src={
              profileData.profileImageUrl
                ? profileData.profileImageUrl[1]
                  ? profileData.profileImageUrl[1]
                  : profileData.profileImageUrl[0]
                : defaultImg
            }
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
              <a
                href="tel:+91-7489167363"
                className=" m-3 flex gap-1  items-center justify-center md:justify-start "
              >
                <MdLocalPhone />
                <span>{profileData.contact}</span>
              </a>
            </div>
            <div>
              <div className="  m-3 flex gap-1 items-center justify-center md:justify-start ">
                <TiUser />
                <span>{profileData.emp_id}</span>
              </div>
              <a
                href={`mailto:${profileData.email}`}
                className=" m-3 flex gap-1 items-center justify-center md:justify-start "
              >
                <MdOutlineLocalPostOffice />
                <span>{profileData.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-1 md:p-5 flex flex-col md:flex-row justify-between lg:flex-row xl:flex-col  ">
        <div className=" flex gap-5 justify-center  items-center text-xl ">
          <a
            target="https://moneyview.slack.com/teams/U06L8R4LT9C"
            // href={profileData.slackUrl !== null ? profileData.slackUrl : ""}
            href="https://moneyview.slack.com/team/U06L8R4LT9C"
            className=" cursor-pointer "
          >
            <BsSlack className=" transition-all duration-300 hover:scale-125 " />
          </a>
          <a
            target="_blank"
            href={
              profileData.linkedinUrl !== null ? profileData.linkedinUrl : ""
            }
            className=" cursor-pointer "
          >
            <IoLogoLinkedin className=" transition-all duration-300 hover:scale-125 " />
          </a>
          <a
            target="_blank"
            href={profileData.twitterUrl !== null ? profileData.twitterUrl : ""}
            className=" cursor-pointer "
          >
            <FaTwitter className=" transition-all duration-300 hover:scale-125 " />
          </a>
          <a
            target="_blank"
            href={profileData.instaUrl !== null ? profileData.instaUrl : ""}
            className=" cursor-pointer "
          >
            <AiFillInstagram className=" transition-all duration-300 hover:scale-125 " />
          </a>
        </div>
        <div className=" flex gap-4 justify-end text-right mt-5  sm:mt-0 ">
          {" "}
          {admin && <ApiToCsvConverter />}
          {((selfEmail && selfEmail === profileData.email) || admin) && (
            <button className="  w-fit p-3 rounded-full bg-[#6e40c9] tracking-wider font-bold   ">
              {" "}
              <EditModel
                manager={managerInfo.email || ""}
                profileData={profileData}
                admin={admin}
                name="profle"
                user_email={id}
                setRenderProfileFlag={setRenderProfileFlag}
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// tel:phoneno
export default TopProfileSection;
