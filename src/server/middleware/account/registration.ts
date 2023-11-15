import { ApiResult } from "../../types/apiResult";
import { addUserDB, getUserByEmailDB } from "../../db/queries.js";

export async function registerUser(credentials: { username: string, email: string, password: string }): Promise<ApiResult> {
    const { username, email, password } = credentials;

    // Ensure that username, email, and password are proper strings
    const stringUsername = String(username);
    const stringEmail = String(email);
    const stringPassword = String(password);

    if (!stringUsername || !stringEmail || !stringPassword) {
        const err = new Error("Credentials are invalid");
        console.error(err.message);
        return { success: false, error: err };
    }
    
    const foundUser = await getUserByEmailDB(stringEmail);

    if (foundUser.data.length != 0) {
        const err = new Error("User with the same email already exists");
        console.error(err.message);
        return { success: false, error: err };
    }
    
    // Pass the string values to addUser function
    return await addUserDB({
        username: stringUsername,
        email: stringEmail,
        password: stringPassword
    });
}
