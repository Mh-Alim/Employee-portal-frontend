import { ReactElement } from "react";
import { IconType } from "react-icons";

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
  slackUrl: string | null;
  instaUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  profileImageUrl: string | null;
  documents: Array<{ name: string; url: string }>;
};

export type ManagerType = {
  name: string;
  email: string;
};

export type ReporteesType = {
  name: string;
  email: string;
};

export type AttachmentType = {
  route_email: string | undefined;
};

export type AttachmentDocumentType = {
  name: string;
  url: string;
  handleDownload: (url: string) => void;
  Icon: ReactElement<any, any>;
};
