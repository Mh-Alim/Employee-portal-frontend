import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiCirclePlus } from "react-icons/ci";
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";
import { AttachmentType } from "./ProfileTypes";
import { uploadAttachmentApi } from "@/api/UploadAttachment";
import { ToastCallError } from "@/ReactToast";

const Attachment = ({ route_email, setRenderProfileFlag }: AttachmentType) => {
  const [attachemnt, setAttachment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    const user_email = route_email || getEmailFromLocalStorage();
    const token = getTokenFromLocalStorage();
    if (!selectedFile || !user_email || !token) {
      ToastCallError("File not selected");
      return;
    }

    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.innerText = "wait..";
      console.log(buttonRef.current);
    }
    const formData = new FormData();

    formData.set("file", selectedFile);
    const data = {
      file_name: attachemnt,
      user_email,
      requested_user_email: getEmailFromLocalStorage(),
    };
    formData.set("data", JSON.stringify(data));
    await uploadAttachmentApi(formData, token);

    setRenderProfileFlag((prev: boolean) => !prev);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
      buttonRef.current.innerText = "Save Changes";
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CiCirclePlus className=" cursor-pointer text-3xl font-extrabold " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Attachment</DialogTitle>
          <DialogDescription>
            Make changes to your Attachment here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Attachments
            </Label>
            <select
              className=" w-full p-1 col-span-3  outline-none border-2   border-slate-100 rounded-lg bg-transparent"
              name=""
              id=""
              onChange={(e) => setAttachment(e.target.value)}
            >
              <option value="" selected>
                Select
              </option>
              <option value="offer-letter">Offer Letter</option>
              <option value="resume">Resume</option>
              <option value="cover-letter">Cover Letter</option>
            </select>
            {attachemnt !== "" && (
              <div className=" col-span-4  ">
                <Input
                  onChange={handleFileChange}
                  type="file"
                  accept="*"
                  className=" cursor-pointer "
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button ref={buttonRef} type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Attachment;
