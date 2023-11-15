import { getCurrentDate } from "../utils/date.js";
import { ApiResult } from "../types/apiResult.js";
import { query } from "./index.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function getAllUsersDB(): Promise<ApiResult> {
    try {
        return ({ success: true, data: (await query('SELECT * FROM accounts;')).rows })
    } catch (err: any) {
        console.error('Error deleting user:', err);
        return { success: false, error: err };
    }
};

export async function getUserByNameDB(username: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT * FROM accounts WHERE username = $1;`;
        return ({ success: true, data: (await query(queryText, [username])).rows[0] })
    } catch (err: any) {
        console.error('Error deleting user:', err);
        return { success: false, error: err };
    }
};

export async function getUserByEmailDB(email: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT * FROM accounts WHERE email = $1;`;
        return ({ success: true, data: (await query(queryText, [email])).rows })
    } catch (err: any) {
        console.error('Error deleting user:', err);
        return { success: false, error: err };
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
        console.log(createdOn);
        const queryValues = [username, hashedPassword, email, createdOn, null];

        await query(queryText, queryValues);

        return { success: true };
    } catch (err: any) {
        console.error('Error adding user:', err);
        return { success: false, error: err };
    }
}

export async function deleteUserByIdDB(userId: number): Promise<ApiResult> {
    try {
        const queryText = `DELETE FROM accounts WHERE user_id = $1;`;
        await query(queryText, [userId]);
        return { success: true };
    } catch (err: any) {
        console.error('Error deleting user:', err);
        return { success: false, error: err };
    }
}

export async function deleteUserByEmailDB(email: string): Promise<ApiResult> {
    try {
        const queryText = `DELETE FROM accounts WHERE email = $1;`;
        await query(queryText, [email]);
        return { success: true };
    } catch (err: any) {
        console.error('Error deleting user:', err);
        return { success: false, error: err };
    }
}

export async function getHashedPasswordDB(username: string): Promise<ApiResult> {
    try {
        const queryText = `SELECT (password) FROM accounts WHERE username = $1;`;
        await (query(queryText, [username]));
        return { success: true };
    } catch (err: any) {
        console.error('Error getting hasned password: ', err);
        return { success: false, error: err }
    }
}