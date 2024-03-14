import { toggle } from "@/app/features/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state) => state.toggle);

  return (
    <div className=" fixed bottom-10 text-4xl right-10 z-10 text-white ">
      {isDark ? (
        <span onClick={() => dispatch(toggle())} className=" cursor-pointer ">
          <MdLightMode />
        </span>
      ) : (
        <span onClick={() => dispatch(toggle())} className=" cursor-pointer ">
          <MdDarkMode className=" text-black " />
        </span>
      )}
    </div>
  );
};

export default DarkMode;
