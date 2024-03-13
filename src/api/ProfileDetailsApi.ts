import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";

const defaultImageUrl =
  "https://cdn4.sharechat.com/img_840073_286c7ec2_1674182835661_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=661_sc.jpg";
export const profileDetailsApi = async (emailInRoute: string) => {
  let user_email =
    emailInRoute.length === 0 ? getEmailFromLocalStorage() : emailInRoute;
  let requested_user_email = getEmailFromLocalStorage();
  let token = getTokenFromLocalStorage();
  if (!token || !user_email || !requested_user_email) {
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
  console.log("details: ", json);

  let slackUrl = "";
  let instaUrl = "";
  let linkedinUrl = "";
  let twitterUrl = "";
  let profileImageUrl = [json.data.profileImageUrl || defaultImageUrl];
  let documents = [{ name: "", url: "" }];

  let len = json.documentUrls.length;
  for (let i = 0; i < len; i++) {
    console.log("json-document: ", json.documentUrls);
    if (json.documentUrls[i][0] === "slackUrl")
      slackUrl = json.documentUrls[i][1];
    else if (json.documentUrls[i][0] === "instagramUrl")
      instaUrl = json.documentUrls[i][1];
    else if (json.documentUrls[i][0] === "twitterUrl")
      twitterUrl = json.documentUrls[i][1];
    else if (json.documentUrls[i][0] === "linkedinUrl")
      linkedinUrl = json.documentUrls[i][1];
    else if (json.documentUrls[i][0] === "profileImageUrl")
      profileImageUrl.push(json.documentUrls[i][1]);
    else {
      documents.push({
        name: json.documentUrls[i][0],
        url: json.documentUrls[i][1],
      });
    }
  }
  const userData = {
    firstName: details.firstName,
    lastName: details.lastName,
    email: details.userEmail,
    contact: details.contactNumber,
    designation: details.designation,
    emp_id: details.empCode,
    joinedAt: details.dateCreated.substring(0, 10),
    skills: json.skills,
    languages: json.languages,
    interests: json.interests,
    slackUrl,
    instaUrl,
    linkedinUrl,
    twitterUrl,
    profileImageUrl,
    documents,
    isAdmin: json.isAdmin,
  };

  console.log("user data: ", userData);

  return userData;
};
