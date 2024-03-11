import { getEmailFromLocalStorage, getTokenFromLocalStorage } from "@/utility"


export const logoutApi = () => {
    const token = getTokenFromLocalStorage();
    const request_user_email = getEmailFromLocalStorage();

    if(!token || !request_user_email) {
        return;
    }
}