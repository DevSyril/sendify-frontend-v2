export function loginResponse(response) {
    if (response.message === "Echec de validation.") {
        if (response.data.email != null)
            return response.data.email[0];
        if (response.data.password != null)
            return response.data.password[0];
    }
    return null;
}

export function registerResponse(response) {

    if (response.message === "Echec de validation.") {
        if (response.data.username != null)
            return response.data.username[0];

        if (response.data.email != null)
            return response.data.email[0];

        if (response.data.password != null)
            return response.data.password[0];

        if (response.data.passwordConfirm != null)
            return response.data.passwordConfirm[0];
    }

    return null;
}

export function resetPasswordResponse(response) {

    if (response.message === "Echec de validation.") {

        if (response.data.email != null)
            return response.data.email[0];
    }
    return null;
}

export function createGroupResponse(response) {

    if (response.message === "Echec de validation.") {

        if (response.data.name != null)
            return response.data.name[0];

        if (response.data.description != null)
            return response.data.description[0];
    }
    return null;
}

export function sendFileResponse(response) {

    if (response.message === "Echec de validation.") {

        if (response.data.file != null)
            return response.data.file[0];

    }
    return null;
}

export function updateUserResponse(response) {

    if (response.message === "Echec de validation.") {

        if (response.data.password != null)
            return response.data.password[0];

        if (response.data.passwordConfirm != null)
            return response.data.passwordConfirm[0];

        if (response.data.phoneNumber != null)
            return response.data.phoneNumber[0];

        if (response.data.profilePhoto != null)
            return response.data.profilePhoto[0];
    }
    return null;
}

export function updateGroupResponse(response) {

    if (response.message === "Echec de validation.") {

        if (response.data.name != null)
            return response.data.name[0];

        if (response.data.description != null)
            return response.data.descripiton[0];

    }
    return null;
}