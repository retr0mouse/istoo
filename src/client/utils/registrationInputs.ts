import { type RegistrationInput } from "types/registrationInput";

export const registrationInputsTemplates = new Map<string, RegistrationInput>([
    ["username", {
        name: "username",
        errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: new RegExp("^[A-Za-z0-9]{3,16}$")
    }],
    ["password", {
        name: "password",
        errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password",
        pattern: new RegExp(`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`)
    }],
    ["email", {
        name: "email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }]
]);

