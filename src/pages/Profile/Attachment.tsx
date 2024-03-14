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
import { FaRegEdit } from "react-icons/fa";

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
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      buttonRef.current.innerText = "Saved";
      buttonRef.current.ariaExpanded = "false";
    }
    setAttachment("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaRegEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-56 bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit Attachments</DialogTitle>
        </DialogHeader>

        <div className="grid  py-0">
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
                  accept=".pdf"
                  className=" cursor-pointer "
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button ref={buttonRef} onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Attachment;
