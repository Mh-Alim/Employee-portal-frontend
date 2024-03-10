import React, { useRef, useState } from "react";

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

type EditProfileModelType = {
  name: string;
  admin: boolean
};
const EditModel = ({ name,admin }: EditProfileModelType) => {
  const [skills, setSkills] = useState([""]);
  const [langs, setLangs] = useState([""]);
  const [interests, setInterests] = useState([""]);

  const saveInfoClickHandler = () => {
    console.log(skills, langs, interests);

    EditInfoApi(skills, langs, interests);
  };
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
        { admin && <CustomInput placeholder="" name="Name" />}
        { admin && <CustomInput placeholder="" name="Designation" />}
        { admin && <CustomInput placeholder="" name="Pod" />}
        { admin &&  <CustomInput placeholder="" name="Phone" />}
        { admin && <CustomInput placeholder="email" name="Manger" />}
        {/* social media url  */}
        <CustomInput placeholder="url" name="slack" />
        <CustomInput placeholder="url" name="twitter" />
        <CustomInput placeholder="url" name="Linkedin" />
        <CustomInput placeholder="url" name="Instagram" />

        {/* options inputs  */}
        <Options
          name="Skills"
          state={skills}
          setState={setSkills}
          options={["Mern", "Node", "Java", "Springboot"]}
        />

        <Options
          name="Languages"
          state={langs}
          setState={setLangs}
          options={["Hindi", "English", "Marathi", "French"]}
        />

        <Options
          name="Interest"
          state={interests}
          setState={setInterests}
          options={["Football", "Tenish", "Cricket", "French"]}
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
};

const CustomInput = ({ name, placeholder }: InputType) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right">
        {name}
      </Label>
      <Input placeholder={placeholder} id={name} className="col-span-3" />
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
            <option value="" selected>Select</option>
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
