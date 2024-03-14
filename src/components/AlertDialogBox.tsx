import { useAppSelector } from "@/app/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AlertDialogBox() {
  const { isDark } = useAppSelector((state) => state.toggle);
  const navigate = useNavigate();
  const logoutFun = () => {
    localStorage.setItem("eportal_token", "");
    localStorage.setItem("eportal_user_email", "");
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>Logout</div>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={` ${isDark && " bg-dark border-slate-700 text-slate-100 "} `}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" text-black ">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              logoutFun();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
