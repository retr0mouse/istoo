import { ApiResult } from "../../types/apiResult";
import { addUserDB, getUserByEmailDB, getUserByNameDB } from "../../db/queries.js";
import { BackendError } from "../../types/backendError.js";

export async function registerUser(credentials: { username: string, email: string, password: string }): Promise<ApiResult> {
    const { username, email, password } = credentials;

    // Ensure that username, email, and password are proper strings
    const stringUsername = String(username);
    const stringEmail = String(email);
    const stringPassword = String(password);

    if (!stringUsername || !stringEmail || !stringPassword) {
        const backendError = new BackendError("Credentials are incomplete", 400);
        return { success: false, error: backendError };
    }

    const emailRequestResult = await getUserByEmailDB(stringEmail);  // if found, the user already exists
    if (emailRequestResult.success) {
        const backendError = new BackendError("User with the same email already exists", 400);
        return { success: false, error: backendError };
    } else if (emailRequestResult.error?.errorCode !== 404) {
        return { success: false, error: emailRequestResult.error };
    }

    const usernameRequestResult = await getUserByNameDB(stringUsername);  // if found, the user already exists
    if (usernameRequestResult.success) {
        const backendError = new BackendError("User with the same username already exists", 400);
        return { success: false, error: backendError };
    } else if (usernameRequestResult.error?.errorCode !== 404) {
        return { success: false, error: usernameRequestResult.error };
    }

    // Pass the string values to addUser function
    return await addUserDB({
        username: stringUsername,
        email: stringEmail,
        password: stringPassword
    });
}
