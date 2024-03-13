import { ToastCallError, ToastCallSuccess } from "@/ReactToast";
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
  request_user_email?: string;
};

export const addEmployeeApi = async (
  data: EmployeeType,
  formData: FormData
) => {
  let user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !user_email) {
    alert("Login to access this resource");
    return;
  }
  data.request_user_email = user_email;
  formData.set("data", JSON.stringify(data));
  console.log("typeof: ", data.dob, typeof data.dob);
  console.log("Form data formed is ", formData);
  console.log("data is ", data);
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
  const options = {
    method: "POST",
    headers: {
      token: token,
    },
    body: formData, // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/register`,
    options
  );

  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    ToastCallSuccess("Successfully Create Employee");
    return;
  }
  ToastCallError("Some issue on the server side");
};

// export const uploadFile = async (file: File) => {
//   console.log("Firing uploadFile");
//   let token = getTokenFromLocalStorage();
//   if (!token) {
//     alert("Login to access this resource");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", file);

//   const options = {
//     method: "POST",
//     headers: {
//       token: token,
//     },
//     body: formData,
//   };

//   const res = await fetch(
//     `${import.meta.env.VITE_BACKEND_URL}/uploadFile`,
//     options
//   );

//   console.log("printing res ", res);

//   const json = await res.json();
//   const output = json.data;

//   console.log("output: ", output);
//   return output;
//   if (res.status === 200) {
//     alert("File uploaded successfully");
//     return;
//   }
//   alert("Some issue on the server side");
// };
