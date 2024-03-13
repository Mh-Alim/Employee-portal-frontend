import { ToastCallError, ToastCallSuccess } from "@/ReactToast";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

type ProfileUrl = {
  name: string;
  url: string;
};

type EditInfoDataType = {
  first_name: string;
  last_name: string;
  contact_number: string;
  designation: string;
  profile_urls: ProfileUrl[];
  skills: string[];
  languages: string[];
  interests: string[];
};

export const EditInfoApi = async (data: EditInfoDataType) => {
  let requested_user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !requested_user_email) {
    ToastCallError("Login to access this resource");
    return;
  }

  const modifiedData = {
    ...data,
    requested_user_email,
  };

  console.log("before update: ", modifiedData);
  const options = {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData), // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/edit/employee`,
    options
  );

  console.log("after edit api", res);

  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    ToastCallSuccess("Successfully Updated User");
    return;
  }
  ToastCallError("Some issue on the server side");
};
