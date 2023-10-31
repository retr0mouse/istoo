import { deleteUserByEmailDB, getUserByEmailDB } from "../../db/queries.js";

export async function deleteUser(userEmail: string) {
    const foundUser = await getUserByEmailDB(userEmail);
    if (!foundUser.data.length) {
        console.error('This user does not exist');
        return { success: false, error: { message: 'User does not exist' }};
    }
    await deleteUserByEmailDB(userEmail);
    return ({ success: true });
}