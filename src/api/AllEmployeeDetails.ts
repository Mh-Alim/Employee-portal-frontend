export const getAllEmployeeApi = async (
  token: string,
  user_email: string,
  getAllReportees: boolean
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ user_email }), // Convert data to JSON string
  };
  let res: any;

  if (getAllReportees) {
    res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/get-reportees`,
      options
    );
  } else {
    res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-all`, options);
  }

  const jsonData = await res.json();
  return jsonData.data;
};
