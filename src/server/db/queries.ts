import { query } from "./index.js";

export async function getAllUsers() {
    const result = await query('select * from accounts;');
    return result.rows;
};

export async function addUser() {

}
