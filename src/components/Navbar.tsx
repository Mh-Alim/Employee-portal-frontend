import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isDark } = useAppSelector((state) => state.toggle);
  function myFunction() {
    var x: any = document.getElementById("navbar-default");
    x.classList.toggle("hidden");
  }
  return (
    <nav
      className={` z-30 fixed top-0 w-full ${
        isDark ? "bg-[#0D1117] bg-glassmorphism " : "bg-light bg-glassmorphism "
      }   font-work_sans p-8 sm:px-20  ${
        isDark ? "text-white" : "text-black"
      } flex justify-between h-20 items-center `}
    >
      <div className=" flex items-center gap-2 ">
        <p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1SdQtedd5Hf2MSihKD3frREpjMZrfVAufDw&usqp=CAU"
            alt=""
            className=" w-10 rounded-full "
          />
        </p>
        <p className=" text-xl ">Employee Portal</p>
      </div>
      <Link to={"/login"}>Login</Link>
    </nav>
  );
};

export default Navbar;
