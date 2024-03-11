export const uploadAttachmentApi = async (formData: FormData, token: string) => {
  const options = {
    method: "POST",
    headers: {
      token: token,
    },
    body: formData, // Convert data to JSON string
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/uploadDocument`,
    options
  );

  console.log("Add Employee: ", res.status);
  if (res.status === 200) {
    alert("Successfully Uploaded Attachment");
    return;
  }
  alert("Some issue on the server side");
};
