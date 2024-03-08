export const getEmailFromLocalStorage = () => {
    return localStorage.getItem("eportal_user_email");
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('eportal_token')
}