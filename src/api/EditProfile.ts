import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

type EditInfoDataType = {
  username: string;
  phone: number;
  designation: string;
  empCode: number;
  joinedAt: string;
  pod: string;
  socialMediaLinks: {
    slackUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
  };
  skills: string[];
  langs: string[];
  interests: string[];
};

export const EditInfoApi = async (
  data:EditInfoDataType
) => {
  let user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !user_email) {
    alert("Login to access this resource");
    return;
  }
 
  const modifiedData  ={
    ...data,user_email
  }
  const options = {
    method: "POST",
    headers: {
      token: token,
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
