import { ApiResult } from "../../types/apiResult";
import bcrypt from "bcrypt";
import { getHashedPasswordDB, getUserByNameDB } from "../../db/queries.js";
import 'dotenv';
import jwt from "jsonwebtoken";

export async function loginUser(username: string, inputPassword: string): Promise<ApiResult> {
    const user = await getUserByNameDB(username);
    if (!user.data) {
        console.error('This user does not exist');
        return { success: false, error: { name: "Database error", message: 'User does not exist, rly?'}};
    }
    const { user_id: userId, password: hashedPassword } = user.data;
    const result = await bcrypt.compare(String(inputPassword), String(hashedPassword));
    
    if (!result) {
        console.error("Provided credentials are wrong");
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
