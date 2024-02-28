import { ApiResult } from "../../types/apiResult.js";
import { deleteUserByEmailDB, getUserByEmailDB } from "../../db/queries.js";
import { BackendError } from "../../types/backendError.js";

export async function deleteUser(userEmail: string): Promise<ApiResult> {
    const requestResult = await getUserByEmailDB(userEmail);
    if (requestResult.success === false) {
        return requestResult;
    }
    if (!requestResult.data.length) {        
        const backendError = new BackendError("The user does not exist", 404);
        return { success: false, error: backendError };
    }
    await deleteUserByEmailDB(userEmail);
    return ({ success: true });
}
