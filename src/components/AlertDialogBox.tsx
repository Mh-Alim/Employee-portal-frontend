import { ToastCallError } from "@/ReactToast";
import { deleteEmployeeApi } from "@/api/DeleteEmployee";
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
import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility";
import { useNavigate } from "react-router-dom";

type AlertDialogType = {
  text: any;
  description: string;
  isDel: boolean;
  id?: string;
};

export default function AlertDialogBox({
  text,
  description,
  isDel,
  id,
}: AlertDialogType) {
  const { isDark } = useAppSelector((state) => state.toggle);
  const navigate = useNavigate();
  const logoutFun = () => {
    localStorage.setItem("eportal_token", "");
    localStorage.setItem("eportal_user_email", "");
    navigate("/");
  };

  const handlerDeleteEmployee = async (id: string | undefined) => {
    console.log("coming to this api or not");
    const token = getTokenFromLocalStorage();
    const requested_user_email = getEmailFromLocalStorage();
    const user_email = id;

    if (!token || !requested_user_email || !user_email) {
      ToastCallError("something is misssing");
      return;
    }

    await deleteEmployeeApi(token, user_email, requested_user_email, navigate);
  };

  console.log("abe yaar: ", text, isDel, description, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>{text}</div>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={` ${isDark && " bg-dark border-slate-700 text-slate-100 "} `}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" text-black ">Cancel</AlertDialogCancel>
          {!isDel && (
            <AlertDialogAction
              onClick={() => {
                logoutFun();
              }}
            >
              Continue
            </AlertDialogAction>
          )}
          {isDel && (
            <AlertDialogAction
              onClick={() => {
                handlerDeleteEmployee(id);
              }}
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
