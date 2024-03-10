import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getEmailFromLocalStorage = () => {
  return localStorage.getItem("eportal_user_email");
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("eportal_token");
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("pathname: ",pathname);
    const profile = document.getElementById("profile");
    if(!profile) return;
    profile.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
