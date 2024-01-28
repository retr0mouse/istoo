`use client`
import { User } from "types/user";

export async function RegisterUser(user: User) {
    if (!user.email || !user.password || !user.username) {
        return;
    }
    console.log(`
        wohoo backend url: ${process.env.NEXT_PUBLIC_BACKEND_URL}/register
        user: ${user}
    `);
    
    const result = ((await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        }
    })));
    return result.json();
}
