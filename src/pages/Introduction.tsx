import React from "react";
import { TbBracketsAngle } from "react-icons/tb";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const About = () => {
  const { isDark } = useAppSelector((state) => state.toggle);
  return (
    <div className="min-h-full  ">
      <div className=" w-full pl-10 md:pl-16  pt-52  lg:p-52 relative  ">
        <img
          className={` w-full sm:w-2/4 h-[40vh] sm:h-[90vh] object-cover object-left ${
            !isDark && "invert"
          }  absolute right-0 top-14 z-0 `}
          src="https://github.githubassets.com/assets/hero-desktop-a38b0fd77b6c.webp"
          alt=""
        />
        <div className=" z-20 relative ">
          <p className=" -left-4 rounded-b-xl w-1 h-full absolute md:-left-10 top-0 timeline bg-[linear-gradient(#0D1117,#08924F)] "></p>
          <h1
            className={` relative text-5xl  ${
              isDark ? "text-white" : "text-black"
            }  z-10 font-work_sans font-extrabold  md:text-9xl `}
          >
            Welcome to Moneyview
          </h1>
          <p
            className={` text-xl  pb-16 relative z-10 sm:text-3xl ${
              isDark ? "text-slate-400" : "text-slate-500"
            }  mt-4 `}
          >
            Made by Team Moneyless
          </p>
        </div>
        {/* // second */}
        <div className=" pb-32  relative ">
          <p className="  bg-[#0D1117] text-4xl  absolute -left-6 md:-left-12 top-3 z-10 text-white ">
            <svg
              aria-hidden="true"
              height="24"
              viewBox="0 0 24 24"
              version="1.1"
              width="24"
              data-view-component="true"
              className="octicon octicon-lock"
              fill="white"
            >
              <path d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z"></path>
            </svg>
          </p>
          <p className=" rounded-b-xl w-1 h-full absolute -left-4 md:-left-10  top-10 bg-[linear-gradient(#0D1117,#8471d5)] "></p>
          <Link
            to={"/login"}
            className=" pt-5 ml-2 cursor-pointer  button-shadow  text-white py-4 px-8 rounded-xl bg-[#08924F] w-fit "
          >
            Sign in for Employee Portal
          </Link>
        </div>
        {/* third */}
        <div className=" mt-10 relative min-h-64 w-full sm:w-3/5  ">
          <p
            className={` bg-[#0D1117]  ${
              isDark ? "text-white" : "text-black"
            }  text-4xl  absolute -left-6 md:-left-12 top-6 z-10   `}
          >
            <svg
              aria-hidden="true"
              height="24"
              viewBox="0 0 24 24"
              version="1.1"
              width="24"
              data-view-component="true"
              className="octicon octicon-briefcase icon-shadow  "
              fill="white"
            >
              <path d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 21.25 22H2.75A1.75 1.75 0 0 1 1 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26A4.235 4.235 0 0 1 18.75 13H5.25a4.235 4.235 0 0 1-2.75-1.01Zm19-3.24v-3a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v3a2.75 2.75 0 0 0 2.75 2.75h13.5a2.75 2.75 0 0 0 2.75-2.75Zm-6.5-7a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4h6Z"></path>
            </svg>
          </p>

          <p className="rounded-b-xl w-1 h-full absolute -left-4 md:-left-10 top-14 bg-[linear-gradient(#0D1117,#8471d5)]"></p>
          <div
            className={`${
              isDark ? "text-white" : "text-black"
            } py-4 px-8 rounded-xl w-full`}
          >
            <p className="text-xl sm:text-2xl font-work_sans font-semibold tracking-wider mb-4">
              Features
            </p>
            <p className="text-2xl sm:text-2xl mb-4">
              <span className="text-xl sm:text-2xl text-[#08924F] font-bold">
                Efficient Data Management:
              </span>
              <br />
              Seamlessly export CSV data of reportees, to get detailed
              information in an instant.
            </p>

            <p className="text-xl sm:text-2xl mb-4">
              <span className="text-xl sm:text-2xl text-[#08924F] font-bold">
                Bulk Employee Addition:{" "}
              </span>
              <br />
              Simplify the process of adding multiple employees simultaneously
              by supporting JSON data format for quick and efficient data entry.
            </p>
            <p className="text-lg sm:text-2xl mb-4">
              <span className="text-xl sm:text-2xl text-[#08924F] font-bold">
                Advanced Proficiency Search:{" "}
              </span>
              <br />
              Empower users with a robust search functionality capable of
              handling a vast array of proficiencies, facilitating quick and
              accurate retrieval of relevant employee data.
            </p>
            <p className="text-lg sm:text-2xl mb-4">
              <span className="text-xl sm:text-2xl text-[#08924F] font-bold">
                Customizable Theme Modes:
              </span>
              <br />
              Enhance user experience with both Dark Mode and Light Mode
              options, allowing users to personalize their interface based on
              their preferences and environmental conditions.
            </p>
            <p className="text-lg sm:text-2xl mb-4">
              <span className="text-xl sm:text-2xl text-[#08924F] font-bold">
                Innovative and responsive UI design:{" "}
              </span>
              <br />
              Innovative and responsive UI design is meticulously crafted to
              provide users with an engaging and seamless experience across
              various devices and screen sizes.
            </p>
          </div>
        </div>
        {/* fifth */}
        <TreeCard />
      </div>
    </div>
  );
};

const TreeCard = () => {
  const { isDark } = useAppSelector((state) => state.toggle);
  return (
    <div className=" mt-10 relative min-h-64 w-full  ">
      <p
        className={` bg-[#0D1117]  ${
          isDark ? "text-white" : "text-black"
        } text-4xl  absolute -left-6 md:-left-12 top-6 z-10   `}
      >
        <svg
          aria-hidden="true"
          height="24"
          viewBox="0 0 24 24"
          version="1.1"
          width="24"
          data-view-component="true"
          className="octicon octicon-briefcase icon-shadow"
          fill="white"
        >
          <path d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 21.25 22H2.75A1.75 1.75 0 0 1 1 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26A4.235 4.235 0 0 1 18.75 13H5.25a4.235 4.235 0 0 1-2.75-1.01Zm19-3.24v-3a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v3a2.75 2.75 0 0 0 2.75 2.75h13.5a2.75 2.75 0 0 0 2.75-2.75Zm-6.5-7a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4h6Z"></path>
        </svg>
      </p>

      <p className=" rounded-b-xl w-1 h-full absolute -left-4 md:-left-10 top-14 bg-[linear-gradient(#0D1117,#8471d5)] "></p>
      <div
        className={` font-work_sans  ${
          isDark ? "text-white" : "text-black"
        } py-4 px-8 rounded-xl  w-full`}
      >
        <p className=" text-4xl font-semibold tracking-wider ">
          <span className=" text-[#08924F]  ">Organization</span> Tree View
        </p>
        <div className="mt-10 h-96 bg-glassmorphism flex justify-between flex-col sm:flex-row lg:w-3/4">
          <div className="rounded-lg p-5 h-1/2 sm:w-1/2 sm:h-full sm:flex sm:flex-col sm:justify-between">
            <p className="text-md text-slate-400 text-xl">
              <span className={`${isDark ? "text-white" : "text-black"}`}>
                The tree layout{" "}
              </span>
              provides a clear and concise representation of the employee
              hierarchy, enabling users to navigate through the organizational
              structure with ease and efficiency.
            </p>
          </div>
          <div className="w-full sm:w-1/2 h-1/2 sm:h-full relative">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/977/733/original/diagrams-neon-light-icons-set-network-tree-function-graph-flowchart-planning-process-flow-data-visualization-symbolic-representation-of-info-glowing-signs-isolated-illustrations-vector.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
