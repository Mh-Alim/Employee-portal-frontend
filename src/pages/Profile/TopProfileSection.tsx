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

const TopProfileSection = (
  profileData: ProfileDataType,
  id: string,
  managerInfo: ManagerType
) => {
  let isAdmin = false;
  let params = false;

  return (
    <section className=" bg-glassmorphism min-h-7  flex flex-col gap-1  2xl:gap-20 justify-between md:flex-col xl:flex-row   ">
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
                <TiUser />
                <span>{profileData.emp_id}</span>
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
export default TopProfileSection;
