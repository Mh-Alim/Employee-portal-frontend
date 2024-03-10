import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";


export const profileDetailsApi = async (emailInRoute:string) => {
    
    let user_email = emailInRoute.length === 0 ? getEmailFromLocalStorage() : emailInRoute;
    let requested_user_email = getEmailFromLocalStorage();
    let token = getTokenFromLocalStorage();
    if (!token || !user_email || !requested_user_email) {
      alert("Login to access this resource");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ user_email, requested_user_email }), // Convert data to JSON string
    };


    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/getByUserEmail`,
      options
    );
    const json = await res.json();
    const details = json.data;

    const userData = {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.userEmail,
      contact: details.contactNumber,
      designation: details.designation,
      emp_id: details.empCode,
      joinedAt: details.dateCreated.substring(0, 10),
    };

    return userData;
    
  };