`use client`
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
            throw new Error("Failed to register user, kek");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
