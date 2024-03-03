import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
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
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const dashboardLiData = [
  {
    text: "Profile",
    url: "/user/profile",
    Icon: <CgProfile />,
  },
  {
    text: "Tree View",
    url: "/user/tree-view",
    Icon: <RiOrganizationChart />,
  },
  {
    text: "Search",
    url: "/user/search",
    Icon: <FaSearch />,
  },
  {
    text: "Logout",
    url: "/user/logout",
    Icon: <FiLogOut />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  return (
    <div className=" flex  relative ">
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
        } w-72 p-5 h-[100vh] text-white absolute md:relative z-50 top-0 left-0  bg-slate-800 overflow-y-scroll `}
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
  setShow: (val: boolean) => void;
};

const Li = ({ text, Icon, url, setShow }: LiPropType) => {
  const location = useLocation();
  return (
    <li
      className={` ${
        location.pathname.includes(url)
          ? `bg-green-500 text-white`
          : `bg-white text-black`
      }  mb-3 group transition-all rounded-lg  p-3 mt-10 `}
      onClick={() => setShow(false)}
    >
      <Link className=" flex items-center " to={url}>
        {Icon}
        <p className="ml-2">{text}</p>
      </Link>
    </li>
  );
};

export default Sidebar;
