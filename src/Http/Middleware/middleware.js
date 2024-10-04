import { API_URL } from "../../assets/Utils";

export function isAuthenticated() {

    if (localStorage.getItem('token') != null)
        return true;

    return false;
}