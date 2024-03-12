import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

type ProfileUrl = {
  name: string;
  url: string;
};

type EditInfoDataType = {
  firstName: string;
  lastName: string;
  contactNumber: number;
  designation: string;
  empCode: number;
  joinedAt: string;
  profileUrls: ProfileUrl[];
  skills: string[];
  languages: string[];
  interests: string[];
};

export const EditInfoApi = async (data: EditInfoDataType) => {
  let user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !user_email) {
    alert("Login to access this resource");
    return;
  }

  const modifiedData = {
    ...data,
    user_email,
  };
  console.log("Printing res ", JSON.stringify(data));
  const options = {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/edit/employee`,
    options
  );

  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    alert("Successfully Create Employee");
    return;
  }
  alert("Some issue on the server side");
};
