import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";

const dfsChild = (copyData: any, output: any, email: string) => {
  if (copyData.attributes.email === email) {
    console.log("copyData: ", copyData);
    console.log("output: ", output);
    let emails = [""];
    let len = copyData.children.length;
    for (let i = 0; i < len; i++) {
      let child = copyData.children[i];
      emails.push(child.attributes.email);
    }
    emails.shift();
    console.log("emails: ", emails);

    const opLen = output.reportee.length;
    for (let i = 0; i < opLen; i++) {
      let reportee = output.reportee[i];
      if (!emails.includes(reportee.user_email)) {
        copyData.children.push({
          name: reportee.first_name,
          attributes: {
            department: reportee.designation,
            email: reportee.user_email,
            img_url: reportee.profile_image_url,
          },
          children: [],
        });
      }
    }
    return;
  }

  let len = copyData.children.length;
  for (let i = 0; i < len; i++) {
    dfsChild(copyData.children[i], output, email);
  }
  return;
};

const dfsParent = (copyData: any, output: any, email: string) => {
  if (copyData.attributes.email === output.manager.user_email) {
    return true;
  }

  let len = copyData.children.length;
  for (let i = 0; i < len; i++) {
    if (dfsParent(copyData.children[i], output, email)) return true;
  }
  return false;
};

export const parentHandler = async (email: any, data: any) => {
  console.log("parent handler calling ", email);

  let output = await getManagerAndReporteeByEmail(email);
  console.log("output in parenthandler: ", output);
  let copyData = { ...data };

  if (output.manager?.user_email && !dfsParent(data, output, email)) {
    copyData = {
      name: output.manager.first_name,
      attributes: {
        department: output.manager.designation,
        email: output.manager.user_email,
        img_url: output.manager.profile_image_url,
      },
      children: [{ ...data }],
    };
  }
  dfsChild(copyData, output, email);
  return copyData;
};
