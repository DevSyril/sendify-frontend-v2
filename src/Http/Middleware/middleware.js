import { API_URL } from "../../assets/Utils";

export function isAuthenticated() {
    if (localStorage.getItem('token') === undefined) {
        return false;
    } else {
        return true
    }
}