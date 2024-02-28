`use client`
import { type ApiResponse } from "types/apiResponse";
import { type User } from "types/user";

export async function RegisterUser(user: User): Promise<number> {
    if (!user.email || !user.password || !user.username) {
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            return 200;
        } else {
            const data = await response.json() as ApiResponse;
            throw data.error;
        }
    } catch (error) {
        throw error;
    }
}
