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
  manager: string,
  user_email:string
};
const EditModel = ({ name, admin, profileData,manager,user_email }: EditProfileModelType) => {
  console.log("profiledata: ", profileData);
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
  const [contactNumber, setContactNumber] = useState<number>(profileData.contact);
  const [designation, setDesignation] = useState<string>(
    profileData.designation
  );
  const [empCode, setEmpCode] = useState<number>(profileData.emp_id);
  const [joinedAt, setJoinedAt] = useState<string>(profileData.joinedAt);
  const [pod, setPod] = useState<string>(profileData.pod || "");
  const [slackUrl, setSlackUrl] = useState<string>(profileData.slackUrl || "");

  const [instagramUrl, setInstagramUrl] = useState<string>(
    profileData.instagramUrl || ""
  );
  const [twitterUrl, setTwitterUrl] = useState<string>(
    profileData.twitterUrl || ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState<string>(
    profileData.linkedinUrl || ""
  );

  console.log("Mange",manager)
  useEffect(() => {setManagerEmail(manager)},[manager])
  useEffect(() => {
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
    setManagerEmail(profileData.email);
    setContactNumber(profileData.contact);
    setDesignation(profileData.designation);
    setEmpCode(profileData.emp_id);
    setJoinedAt(profileData.joinedAt);
    setPod(profileData.pod || "");
    setSlackUrl(profileData.slackUrl || "");
    setInstagramUrl(profileData.instagramUrl || "");
    setTwitterUrl(profileData.twitterUrl || "");
    setLinkedinUrl(profileData.linkedinUrl || "");
    profileData.skills &&
      profileData.skills.length > 0 &&
      setSkills(profileData.skills);
    profileData.languages &&
      profileData.languages.length > 0 &&
      setSkills(profileData.languages);
    profileData.interests &&
      profileData.interests.length > 0 &&
      setSkills(profileData.interests);
  }, [profileData]);

  const saveInfoClickHandler = () => {
    console.log(
      firstName,
      lastName,
      managerEmail,
      contactNumber,
      designation,
      empCode,
      joinedAt,
      pod,
      slackUrl,
      instagramUrl,
      linkedinUrl,
      twitterUrl,
      skills,
      languages,
      interests
    );

    const data = {
      firstName,
      lastName,
      contactNumber,
      designation,
      empCode,
      joinedAt,
      pod,
      managerEmail,
      profileUrls: [
        { name: "slackUrl", url: slackUrl },
        { name: "instagramUrl", url: instagramUrl },
        { name: "twitterUrl", url: twitterUrl },
        { name: "linkedinUrl", url: linkedinUrl }
      ],
      skills,
      languages,
      interests,
      user_email,
      requested_user_email : getEmailFromLocalStorage() || ""
      
    };
    console.log("url parseing: ",user_email)
    EditInfoApi(data);
  };

  
  const changeHandler = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline"> */}
        <FaRegEdit />
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your {name} here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* my Details inputs  */}
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
            setState={setPod}
            type="text"
            placeholder=""
            name="Pod"
            value={pod}
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
            name="emp_code"
            value={empCode}
            setState={setEmpCode}
          />
        )}
        {/* social media url  */}
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

        {/* options inputs  */}
        <Options
          name="Skills"
          state={skills}
          setState={setSkills}
          options={["Topup", "KYC", "Starter", "Repeat","Bnpl","Nach"]}
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
          options={["Frontend", "Backend", "Database", "SQL","ReactJs","NodeJs","Springboot","Java","C++"]}
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
    <div className="grid  ">
      <div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            {name}
          </Label>
          <select
            onChange={(e) => {
              setState((prev: string[]) => {
                if (prev.includes(e.target.value)) return prev;
                return [...prev, e.target.value];
              });
            }}
            className=" w-full p-1 col-span-3  outline-none border-2   border-slate-100 rounded-lg bg-transparent"
            name=""
            id=""
          >
            <option value="" selected>
              Select
            </option>
            {options.map((e) => (
              <option value={`${e}`}>{e}</option>
            ))}
          </select>
        </div>
        <div className=" pl-5 pt-3 w-full flex flex-wrap ">
          {state.map((e, index) =>
            e.length == 0 ? undefined : (
              <p className=" w-fit py-1 px-3 mx-1 my-1  bg-slate-300 rounded-xl flex justify-center items-center ">
                <span className=" mr-3 ">{e}</span>
                <span className=" flex justify-center items-center text-white text-xl rounded-full ">
                  <RxCrossCircled
                    className=" cursor-pointer "
                    onClick={() => {
                      setState((prev: any) =>
                        prev.filter((ele: string, idx: number) => idx != index)
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