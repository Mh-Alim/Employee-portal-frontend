import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFeather, FaPeopleGroup } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { FaRegChartBar, FaSearch } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { ImHackernews, ImStopwatch } from "react-icons/im";
import { RiCoupon2Line } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { RiOrganizationChart } from "react-icons/ri";
import { CgAdd, CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const dashboardLiData = [
  {
    text: "Profile",
    url: "/user/profile",
    Icon: <CgProfile />,
    visibility: true,
  },
  {
    text: "Tree View",
    url: "/user/tree-view",
    Icon: <RiOrganizationChart />,
    visibility: true,
  },
  {
    text: "Search",
    url: "/user/search",
    Icon: <FaSearch />,
    visibility: true,
  },
  {
    text: "Add Employe",
    url: "/user/add-employee",
    Icon: <CgAdd />,
    visibility: false,
  },
  {
    text: "Feedback",
    url: "/user/feature-request",
    Icon: <FaFeather />,
    visibility: true,
  },
  {
    text: "Logout",
    url: "/user/logout",
    Icon: <FiLogOut />,
    visibility: true,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const admin = useAppSelector((state) => state.user.isAdmin);
  console.log("sidebar: isadmin ", isAdmin);
  useEffect(() => {
    setIsAdmin(admin);
  }, [admin]);
  return (
    <div className=" flex  relative h-[90vh]  ">
      <p
        onClick={() => setShow((prev) => !prev)}
        className=" z-30 cursor-pointer md:hidden absolute right-3 top-3 "
      >
        <p className=" w-7 h-1 rounded-lg bg-white mb-1 "></p>
        <p className=" w-7 h-1 rounded-lg bg-white mb-1 "></p>
        <p className=" w-7 h-1 rounded-lg bg-white mb-1 "></p>
      </p>
      <div
        className={` -translate-x-80 md:-translate-x-0 transition-all duration-500 ${
          show ? "translate-x-0" : ""
        } w-72 p-5 h-[100vh] text-white absolute md:relative z-50 top-0 left-0  dis-bg-slate-800 overflow-y-scroll `}
      >
        <h1 className=" flex justify-between items-center  mb-5 font-medium text-2xl  ">
          <p className=" uppercase tracking-widest font-work_sans ">Eportal</p>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1SdQtedd5Hf2MSihKD3frREpjMZrfVAufDw&usqp=CAU"
            alt=""
            className=" rounded-full w-10  "
          />
        </h1>
        <div className=" p-2 mb-6 ">
          {/* <h2 className=" uppercase tracking-widest mb-5 ">Dashboard</h2> */}
          <ul className=" list-none ">
            {dashboardLiData.map((item) => (
              <Li
                key={item.url}
                text={item.text}
                url={item.url}
                Icon={item.Icon}
                setShow={setShow}
                visibility={item.visibility}
                isAdmin={isAdmin}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="  w-1/2 flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

type LiPropType = {
  text: string;
  Icon: React.ReactNode;
  url: string;
  visibility: boolean;
  isAdmin: boolean;
  setShow: (val: boolean) => void;
};

const Li = ({ text, Icon, url, setShow, visibility, isAdmin }: LiPropType) => {
  const location = useLocation();

  const navigate = useNavigate();
  const logoutFun = () => {
    localStorage.setItem("eportal_token", "");
    localStorage.setItem("eportal_user_email", "");
    navigate("/");
  };

  return (
    <li
      className={` ${
        location.pathname.includes(url) ? `bg-[#6e00a0]` : `bg-[#6e40c9]`
      }  mb-3 group text-white transition-all  rounded-lg  p-3 mt-10 ${
        visibility || isAdmin ? "block" : "hidden"
      } `}
      onClick={() => {
        url === "/user/logout" ? logoutFun() : setShow(false);
      }}
    >
      <Link className=" flex items-center " to={url}>
        {Icon}
        <p className="ml-2">{text}</p>
      </Link>
    </li>
  );
};

export default Sidebar;
