import { User } from "types/user";

export async function RegisterUser(user: User) {
    if (!user.email || !user.password || !user.username) {
        return;
    }
    const result = ((await fetch(process.env.BACKEND_URL + "/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })));
    return result.json();
}
