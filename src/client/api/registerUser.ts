`use client`
import { type User } from "types/user";

export async function RegisterUser(user: User): Promise<number> {
    if (!user.email || !user.password || !user.username) {
        return;
    }
    console.log(`
        wohoo backend url: ${process.env.NEXT_PUBLIC_BACKEND_URL}/register
    `);
    
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
            throw new Error("Failed to register user");
        }
    } catch (error) {
        console.error(error);
    }
}
