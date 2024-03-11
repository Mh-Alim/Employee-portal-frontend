import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

export const loginApi = async (user_email: string, password: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email, password }), // Convert data to JSON string
  };
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, options);
  const json = await res.json();
  localStorage.setItem("eportal_token", json.data);
  localStorage.setItem("eportal_user_email", user_email);
};

export const isLoggedIn = async () => {
  const user_email = getEmailFromLocalStorage();
  const token = getTokenFromLocalStorage();
  if (!user_email || !token) return false;

  console.log("maiL ", user_email, token);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({  user_email }), // Convert data to JSON string
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/isLoggedIn`,
    options
  );
  if (res.status === 200) return true;
  return false;
};
