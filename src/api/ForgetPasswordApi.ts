import { NavigateFunction } from "react-router-dom";

export const forgetPasswordApi = async (
  user_email: string,
  navigate: NavigateFunction
) => {
  if (!user_email) {
    navigate("/forget/email");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email }), // Convert data to JSON string
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/forgot-password`,
    options
  );
  if (res.status === 200) {
    navigate("/forget/otp", { state: { user_email } });
    return;
  }

  alert("Wrong Email");
};

export const otpApi = async (
  otp: string,
  user_email: string,
  navigate: NavigateFunction
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email }), // Convert data to JSON string
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/verify-otp?otp=${otp}`,
    options
  );

  console.log("Res.status for otpapi : ", res.status);
  if (res.status === 200) {
    navigate("/forget/new-password", { state: { user_email, otp } });
    return;
  }

  alert("Wrong OTP");
};

export const changePasswordApi = async (
  password: string,
  otp: string,
  user_email: string,
  navigate: NavigateFunction
) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email, password }), // Convert data to JSON string
  };

  console.log("change-password: ", otp, password, user_email);
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/reset-password?otp=${otp}`,
    options
  );

  console.log("res from change password", res.status);
  if (res.status === 200) {
    alert("Password changed successfully");
    navigate("/login");
    return;
  }

  alert("Something Issue on the server side");
};
