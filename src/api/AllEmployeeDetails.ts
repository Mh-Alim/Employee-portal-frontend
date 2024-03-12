


export const getAllEmployeeApi = async(token:string, user_email:string) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ user_email }), // Convert data to JSON string
      };

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-all`,
        options
      );
      const jsonData = await res.json();
      return jsonData.data
}