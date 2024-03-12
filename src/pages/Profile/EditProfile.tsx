import React, { useEffect, useRef, useState } from "react";

import { RxCrossCircled } from "react-icons/rx";
// shad cn ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEdit } from "react-icons/fa";
import { EditInfoApi } from "@/api/EditProfile";
import { ProfileDataType } from "./ProfileTypes";
import { getManagerAndReporteeByEmail } from "@/api/GetManagerAndChildApi";
import { getEmailFromLocalStorage } from "@/utility";

type EditProfileModelType = {
  name: string;
  admin: boolean;
  profileData: ProfileDataType;
  manager: string;
  user_email: string;
};
const EditModel = ({
  name,
  admin,
  profileData,
  manager,
  user_email,
}: EditProfileModelType) => {
  const [skills, setSkills] = useState<string[]>(
    profileData.skills ? profileData.skills : []
  );
  const [languages, setLanguages] = useState<string[]>(
    profileData.languages ? profileData.languages : []
  );
  const [interests, setInterests] = useState<string[]>(
    profileData.languages ? profileData.languages : []
  );

  const [firstName, setFirstName] = useState<string>(profileData.firstName);
  const [lastName, setLastName] = useState<string>(profileData.lastName);
  const [managerEmail, setManagerEmail] = useState<string>(manager);
  const [contactNumber, setContactNumber] = useState<string>(
    profileData.contact
  );
  const [designation, setDesignation] = useState<string>(
    profileData.designation
  );
  const [empCode, setEmpCode] = useState<string>(profileData.emp_id);
  const [joinedAt, setJoinedAt] = useState<string>(profileData.joinedAt);
  const [slackUrl, setSlackUrl] = useState<string>(profileData.slackUrl || "");
  const [instagramUrl, setInstagramUrl] = useState<string>(
    profileData.instaUrl || ""
  );
  const [twitterUrl, setTwitterUrl] = useState<string>(
    profileData.twitterUrl || ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState<string>(
    profileData.linkedinUrl || ""
  );


  

  useEffect(() => {
    setManagerEmail(manager);
  }, [manager]);

  console.log("current manager is : ", managerEmail);
  useEffect(() => {
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
    setContactNumber(profileData.contact);
    setDesignation(profileData.designation);
    setEmpCode(profileData.emp_id);
    setJoinedAt(profileData.joinedAt);
    setSlackUrl(profileData.slackUrl || "");
    setInstagramUrl(profileData.instaUrl || "");
    setTwitterUrl(profileData.twitterUrl || "");
    setLinkedinUrl(profileData.linkedinUrl || "");
    profileData.skills &&
      profileData.skills.length > 0 &&
      setSkills(profileData.skills);
    profileData.languages &&
      profileData.languages.length > 0 &&
      setLanguages(profileData.languages);
    profileData.interests &&
      profileData.interests.length > 0 &&
      setInterests(profileData.interests);
  }, [profileData]);

  console.log("Langu", languages);
  console.log("interets in edit", interests);
  const saveInfoClickHandler = async () => {
    const data = {
      firstName,
      lastName,
      contactNumber,
      designation,
      empCode,
      joinedAt,
      manager_email: managerEmail,
      profileUrls: [
        { name: "slackUrl", url: slackUrl },
        { name: "instagramUrl", url: instagramUrl },
        { name: "twitterUrl", url: twitterUrl },
        { name: "linkedinUrl", url: linkedinUrl },
      ],
      skills,
      languages,
      interests,
      user_email,
      requested_user_email: getEmailFromLocalStorage() || "",
    };
    console.log("before edit info : ", data);
    await EditInfoApi(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaRegEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your {name} here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {admin && (
          <CustomInput
            type="text"
            placeholder=""
            name="First Name"
            value={firstName}
            setState={setFirstName}
          />
        )}

        {admin && (
          <CustomInput
            type="text"
            placeholder=""
            name="Last Name"
            value={lastName}
            setState={setLastName}
          />
        )}

        {admin && (
          <CustomInput
            type="text"
            placeholder=""
            name="Designation"
            value={designation}
            setState={setDesignation}
          />
        )}

        {admin && (
          <CustomInput
            type="number"
            placeholder=""
            name="Contact Number"
            value={contactNumber}
            setState={setContactNumber}
          />
        )}

        {admin && (
          <CustomInput
            type="email"
            placeholder="email"
            name="Manger"
            value={managerEmail}
            setState={setManagerEmail}
          />
        )}

        {admin && (
          <CustomInput
            type="date"
            placeholder="date"
            name="JoinedAt"
            value={joinedAt}
            setState={setJoinedAt}
          />
        )}

        {admin && (
          <CustomInput
            type="number"
            placeholder="employee code"
            name="Employee code"
            value={empCode}
            setState={setEmpCode}
          />
        )}

        <CustomInput
          setState={setSlackUrl}
          type="text"
          placeholder="url"
          name="slack"
          value={slackUrl}
        />

        <CustomInput
          setState={setTwitterUrl}
          type="text"
          placeholder="url"
          name="twitter"
          value={twitterUrl}
        />

        <CustomInput
          setState={setLinkedinUrl}
          type="text"
          placeholder="url"
          name="Linkedin"
          value={linkedinUrl}
        />

        <CustomInput
          type="text"
          placeholder="url"
          name="Instagram"
          value={instagramUrl}
          setState={setInstagramUrl}
        />

        <Options
          name="Skills"
          state={skills}
          setState={setSkills}
          options={["Topup", "KYC", "Starter", "Repeat", "Bnpl", "Nach"]}
        />

        <Options
          name="Languages"
          state={languages}
          setState={setLanguages}
          options={["English", "Hindi", "Marathi", "Bengali"]}
        />

        <Options
          name="Interest"
          state={interests}
          setState={setInterests}
          options={[
            "Frontend",
            "Backend",
            "Database",
            "SQL",
            "ReactJs",
            "NodeJs",
            "Springboot",
            "Java",
            "C++",
          ]}
        />

        <DialogFooter>
          <Button onClick={saveInfoClickHandler} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type InputType = {
  name: string;
  placeholder: string;
  value: string | number;
  type: "text" | "number" | "email" | "date";
  setState: (e: any) => void;
};

const CustomInput = ({
  name,
  placeholder,
  value,
  type,
  setState,
}: InputType) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right">
        {name}
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        id={name}
        className="col-span-3 remove-arrow "
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

type EditOptionTypes = {
  name: string;
  setState: any;
  state: string[];
  options: string[];
};

const Options = ({ name, state, setState, options }: EditOptionTypes) => {
  return (
    <div className="grid">
      <div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-white text-right">
            {name}
          </Label>
          <select
            onChange={(e) => {
              setState((prev: string[]) => {
                if (prev.includes(e.target.value)) return prev;
                return [...prev, e.target.value];
              });
            }}
            className="w-full p-1 col-span-3 outline-none border-2 border-white rounded-lg bg-black text-white"
            name=""
            id=""
          >
            <option value="" defaultChecked>
              Select
            </option>
            {options.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="pl-5 pt-3 w-full flex flex-wrap">
          {state.map((e, index) =>
            e.length === 0 ? undefined : (
              <p
                key={e}
                className="w-fit py-1 px-3 mx-1 my-1 bg-white text-black rounded-xl flex justify-center items-center"
              >
                <span className="mr-3">{e}</span>
                <span className="flex justify-center items-center text-black text-xl rounded-full">
                  <RxCrossCircled
                    className="cursor-pointer"
                    onClick={() => {
                      setState((prev: any) =>
                        prev.filter((ele: string, idx: number) => idx !== index)
                      );
                    }}
                  />
                </span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModel;
