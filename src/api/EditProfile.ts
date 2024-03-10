import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";




export const EditInfoApi = async(skills:string[],langs:string[],interests:string[]) => {


    let user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !user_email) {
    alert("Login to access this resource");
    return;
  }
  const data = {
    token,
    user_email,
    skills,
    langs,
    interests
  }
 
  const options = {
    method: "POST",
    headers: {
      token: token,
    },
    body: JSON.stringify(data), // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/register`,
    options,
  );



  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    alert("Successfully Create Employee");
    return;
  }
  alert("Some issue on the server side");

};
