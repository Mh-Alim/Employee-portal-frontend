import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "../utility";


type EmployeeType = {
    first_name: string;
    last_name: string;
    user_email: string;
    password: string;
    emp_code: string;
    designation: string;
    contact_number: string;
    manager_email: string;
    dob: string;
    request_user_email?:string;
  };

export const addEmployeeApi = async (data:EmployeeType) => {
    let user_email = getEmailFromLocalStorage();
    let token = getTokenFromLocalStorage();
    if (!token || !user_email) {
      alert("Login to access this resource");
      return;
    }
    console.log("typeof: ",data.dob, typeof(data.dob));
    data.request_user_email=user_email;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data), // Convert data to JSON string
    };
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      options
    );
    
    

    console.log("Add Employee: ",res.status);
    if(res.status === 200) {
        alert("Successfully Create Employee");
        return;
    }
    alert("Some issue on the server side");

  };