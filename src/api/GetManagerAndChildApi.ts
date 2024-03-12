import { ToastCallError } from "@/ReactToast";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

// export const getManagerAndChild = async () => {
//     let user_email = getEmailFromLocalStorage();
//     let token = getTokenFromLocalStorage();
//     if (!token || !user_email) {
//       alert("Login to access this resource");
//       return;
//     }
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,
//       },
//       body: JSON.stringify({ user_email, requested_user_email: user_email }), // Convert data to JSON string
//     };
//     const res = await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/getNeighbours`,
//       options
//     );
//     const json = await res.json();
//     const output = json.data;
//     if(!output || !user_email) {
//         alert("some error while calling getManageraAncChidlApi");
//         return;
//     }
//     return output
// }

export const getManagerAndReporteeByEmail = async (id: string) => {
  let token = getTokenFromLocalStorage();
  let user_email = id;
  let requested_user_email = getEmailFromLocalStorage();

  console.log(
    "getNeighboursBgEmail : ",
    token,
    user_email,
    requested_user_email
  );
  if (!user_email || !requested_user_email || !token) {
    ToastCallError("you are not logged in ");
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
    `${import.meta.env.VITE_BACKEND_URL}/getNeighbours`,
    options
  );
  const json = await res.json();
  const moreData = json.data;
  return moreData;
};
