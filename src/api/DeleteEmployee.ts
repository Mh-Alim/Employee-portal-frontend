import { ToastCallError, ToastCallSuccess } from "@/ReactToast";
import { NavigateFunction } from "react-router-dom";

export const deleteEmployeeApi = async (
  token: string,
  user_email: string,
  requested_user_email: string,
  navigate: NavigateFunction
) => {
  const options = {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email, requested_user_email }), // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/deleteEmployee`,
    options
  );

  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    ToastCallSuccess("Successfully Deleted Employee");
    navigate("/user/profile");
    return;
  }
  ToastCallError("Unable to delete");
};
