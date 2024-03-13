import { profileDetailsApi } from "@/api/ProfileDetailsApi";
import { addUser } from "@/app/features/userSlice";
import { useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";

export const useStateLoad = (pathname?: string) => {
  const dispatch = useAppDispatch();

  console.log("pathname is ", pathname);
  const getProfileDetails = async (emailId: string) => {
    const userData = await profileDetailsApi(emailId);
    if (!userData) {
      return;
    }
    dispatch(addUser(userData));
  };
  useEffect(() => {
    getProfileDetails("");
  }, [pathname]);
};
