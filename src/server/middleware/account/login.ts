import { ApiResult } from "../../types/apiResult";
import bcrypt from "bcrypt";
import { getHashedPasswordDB, getUserByNameDB } from "../../db/queries.js";
import 'dotenv';
import jwt from "jsonwebtoken";
import { BackendError } from "../../types/backendError.js";

export async function loginUser(username: string, inputPassword: string): Promise<ApiResult> {
    const requestResult = await getUserByNameDB(username);
    if (requestResult.success === false) {
        return requestResult;
    }
    if (!requestResult.data) {
        const backendError = new BackendError("User does not exist", 404);
        return { success: false, error: backendError };
    }
    const { user_id: userId, password: hashedPassword } = requestResult.data;
    const result = await bcrypt.compare(String(inputPassword), String(hashedPassword));
    
    if (!result) {
        return ({ success: false, error: { name: "Authentication error", message: "Credentials are wrong"} });
    }
    const token = jwt.sign(
        {userId, hashedPassword},
        process.env.TOKEN_KEY || "kek",
        {
            expiresIn: "2h"
        }
    );
    return ({ success: true, data: token });
}
