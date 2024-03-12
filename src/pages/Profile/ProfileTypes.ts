

export type ProfileDataType = {
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    designation: string;
    emp_id: string;
    joinedAt: string;
    skills: string[];
    languages: string[];
    interests: string[];
    slackUrl: string;
    instaUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    profileImageUrl: string;
    offerLetter: {name: string, url: string};

  };


  export type ManagerType = {
    name: string,
    email: string
  }

  export type ReporteesType = {
    name: string,
    email: string,
  }


  export type AttachmentType = {
    route_email : string|undefined,
  }