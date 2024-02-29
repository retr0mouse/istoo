import { ApiResult } from "../../types/apiResult";
import bcrypt from "bcrypt";
import { getHashedPasswordDB, getUserByNameDB } from "../../db/queries.js";
import 'dotenv';
import jwt from "jsonwebtoken";
import { BackendError } from "../../types/backendError.js";

export async function loginUser(username: string, inputPassword: string): Promise<ApiResult> {
    const requestResult = await getUserByNameDB(username);
    if (!requestResult.success) {
        return requestResult;
    }
    if (!requestResult.data) {
        const backendError = new BackendError("User does not exist", 404);
        return { success: false, error: backendError };
    }
    const { user_id: userId, password: hashedPassword } = requestResult.data;
    const result = await bcrypt.compare(String(inputPassword), String(hashedPassword));
    
    if (!result) {
        const backendError = new BackendError("Credentials are wrong", 401);
        return ({ success: false, error: backendError });
    }
    if (!process.env.TOKEN_KEY) {
        const backendError = new BackendError("Server error: no token key", 500);
        return ({ success: false, error: backendError });
    }
    const token = jwt.sign(
        {userId},
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h"
        }
    );
    return ({ success: true, data: token });
}
