export const feedbackApi = async (
  token: string,
  user_email: string,
  type: string,
  message: string
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ user_email, message }), // Convert data to JSON string
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/feedback?type=${type}`,
    options
  );
  if (res.status >= 200 && res.status < 300) {
    alert("Feedback submitted sucessfully");
    return;
  }
  alert("Some issue on feedback submisstion");
};
