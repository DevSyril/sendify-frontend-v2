import axios from "axios";
import { API_URL } from "../../assets/Utils";

export async function login(formData) {
    try {
        const response = await axios.post(API_URL.loginUrl, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function registration(formData) {
    try {
        const response = await axios.post(API_URL.registrationUrl, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function otpCheck(formData) {
    try {
        const response = await axios.post(API_URL.otpCheckUrl, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function resetPassword(formData) {
    try {
        const response = await axios.post(API_URL.resetPassword, formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function groupCreation(formData) {
    
    try {
        const response = await axios.post(API_URL.createGroup, formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }});
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function sendFile(formData) {
    
    try {
        const response = await axios.post(API_URL.sendFile, formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }});
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function addGroupMember(formData) {
    
    try {
        const response = await axios.post(API_URL.addMember, formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }});
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateUser(formData) {
    
    try {
        const response = await axios.post(API_URL.updateUser, formData, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }});
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}