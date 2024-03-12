import { isLoggedIn } from "@/api/LoginApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRouteToLogin = () => {
  const navigate = useNavigate();
  const isLoggedInRes = async () => {
    const res: boolean = await isLoggedIn();
    if (!res) {
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    isLoggedInRes();
  }, []);
};
