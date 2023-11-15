import { ApiResult } from "../../types/apiResult.js";
import { deleteUserByEmailDB, getUserByEmailDB } from "../../db/queries.js";

export async function deleteUser(userEmail: string): Promise<ApiResult> {
    const foundUser = await getUserByEmailDB(userEmail);    // the database query does not throw an error 
if (!foundUser.data.length) {                               // if the result is empty, so we have to check if it is.
        console.error('This user does not exist');
        return { success: false, error: { name: "Database error", message: 'User does not exist' } };
    }
    await deleteUserByEmailDB(userEmail);
    return ({ success: true });
}
