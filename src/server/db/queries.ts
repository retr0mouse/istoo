import { getCurrentDate } from "../utils/date.js";
import { ApiResult } from "../types/apiResult.js";
import { query } from "./index.js";
import bcrypt from "bcrypt";
import { BackendError } from "../types/backendError.js";
const saltRounds = 10;

export async function getAllUsersDB(): Promise<ApiResult> {
    try {
        const queryResult =  await query('SELECT * FROM accounts;');
        if (queryResult.rows.length === 0) {
            const backendError = new BackendError("No users are present in the database", 404);
            return { success: false,  error: backendError };
        }
        return ({ success: true, data: queryResult.rows })
        
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
};

export async function getUserByNameDB(username: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT * FROM accounts WHERE username = $1;`;
        const queryResult =  await query(queryText, [username]);
        if (queryResult.rows.length === 0) {
            const backendError = new BackendError("User does not exist", 404);
            return { success: false,  error: backendError };
        }
        return ({ success: true, data: queryResult.rows[0] })
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
};

export async function getUserByEmailDB(email: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT * FROM accounts WHERE email = $1;`;
        const queryResult =  await query(queryText, [email]);
        if (queryResult.rows.length === 0) {
            const backendError = new BackendError("User does not exist", 404);
            return { success: false,  error: backendError };
        }
        return ({ success: true, data: queryResult.rows[0] })
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
};

export async function addUserDB(request: { username: string, password: string, email: string }): Promise<ApiResult> {
    const { username, password, email } = request;

    try {
        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Use parameterized query to safely insert data into the database
        const queryText = `
            INSERT INTO accounts (username, password, email, created_on, last_login)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const createdOn = getCurrentDate();
        const queryValues = [username, hashedPassword, email, createdOn, null];

        await query(queryText, queryValues);
        return { success: true };
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
}

export async function deleteUserByIdDB(userId: number): Promise<ApiResult> {
    try {
        const queryText = `DELETE FROM accounts WHERE user_id = $1;`;
        await query(queryText, [userId]);
        return { success: true };
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
}

export async function deleteUserByEmailDB(email: string): Promise<ApiResult> {
    try {
        const queryText = `DELETE FROM accounts WHERE email = $1;`;
        await query(queryText, [email]);
        return { success: true };
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
}

export async function getHashedPasswordDB(username: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT (password) FROM accounts WHERE username = $1;`;
        await (query(queryText, [username]));
        return { success: true };
    } catch (err: any) {
        const backendError = BackendError.fromError(err, 500);
        return { success: false, error: backendError };
    }
}