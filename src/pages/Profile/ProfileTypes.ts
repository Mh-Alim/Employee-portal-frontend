

export type ProfileDataType = {
    firstName: string;
    lastName: string;
    email: string;
    contact: number;
    emp_id: number;
    designation: string;
    joinedAt: string;
    pod?: string;
    slackUrl?: string;
    twitterUrl?:string;
    instagramUrl?:string;
    linkedinUrl?:string;
    skills?: string[];
    languages?:string[];
    interests?:string[];

  };


  export type ManagerType = {
    name: string,
    email: string
  }

  export type ReporteesType = {
    name: string,
    email: string,
  }