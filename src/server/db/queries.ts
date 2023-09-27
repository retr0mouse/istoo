import { query } from "./index.js";

export async function getAllUsers() {
    // return "zhopa";
    console.log("Im doing some shit");
    const result = await query('select * from accounts;d;;').catch((error) => {
        console.log(error);
        throw error;
    });
    console.log("Im doing some shit");
    return result.rows;
};

export async function addUser() {

}
