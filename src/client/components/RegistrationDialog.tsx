import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { registrationInputsTemplates } from "utils/registrationInputs";
import { type User } from "types/user";
import { RegisterUser } from "api/registerUser";

export default function RegisterDialog({ onActivated, onDisabled, onClicked }: { onActivated: boolean, onDisabled: () => void, onClicked: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const inputsTemplates = registrationInputsTemplates;

    function getErrorMessage(inputName: string, inputValue: string): string {
        const inputType = inputsTemplates.get(inputName);
        let errorMessage: string;
        if (!inputType || !inputValue) return;
        if (!inputType.pattern) {
            errorMessage = inputValue.length > 0 ? "" : inputType.errorMessage;
        } else {
            errorMessage = !inputType.pattern.test(inputValue) ? inputType.errorMessage : "";
        }
        return errorMessage;
    }

    function areAllInputsValid(): boolean {
        const usernamePattern = inputsTemplates.get("username").pattern;
        const passwordPattern = inputsTemplates.get("password").pattern;
        const emailPattern = inputsTemplates.get("email").pattern;
        if (
            !comparePasswords() ||
            !usernamePattern.test(username) ||
            !passwordPattern.test(password) ||
            !emailPattern.test(email)
        ) return false;
        return true;
    }

    function comparePasswords(): boolean {
        return password === confirmPassword;
    }

    function closeRegisterDialog() {
        setIsOpen(false);
        onDisabled();
    }

    function openRegisterDialog() {
        setIsOpen(true);
    }

    function openLoginDialog() {
        closeRegisterDialog();
        onClicked();
    }

    async function sendRequestToCreateUser(): Promise<void> {
        if (!areAllInputsValid()) {
            console.log("inputs are not correct");
            return;
        }
        const user = {
            username: username,
            password: password,
            email: email
        } as User;

        try {
            await RegisterUser(user);
            // TODO: redirect to the success screen to be able to log in
            
        } catch (error) {
            console.log(error);
        }        
        closeRegisterDialog();
    }

    useEffect(() => {
        if (onActivated) {
            openRegisterDialog();
        }
    }, [onActivated])

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeRegisterDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-14 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="p"
                                        className="text-4xl font-mono font-normal text-gray-900"
                                    >
                                        Sign up to Istoo
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col w-full gap-2">
                                        <label htmlFor="email" defaultValue={""}>{getErrorMessage("email", email)}</label>
                                        <input name={"email"} type="text" placeholder='Email' value={email} className={`p-2 font-sans w-full border`} onChange={(event) => setEmail(event.target.value)} />
                                        <label htmlFor="username" defaultValue={""}>{getErrorMessage("username", username)}</label>
                                        <input name={"username"} type="text" placeholder='Username' value={username} className={`p-2 font-sans w-full border`} onChange={(event) => setUsername(event.target.value)} />
                                        <label htmlFor="password">{getErrorMessage("password", password)}</label>
                                        <input name={"password"} type="password" placeholder='Password' value={password} className={`p-2 font-sans w-full border`} onChange={(event) => setPassword(event.target.value)} />
                                        <label htmlFor="confirmPassword" defaultValue={""}>{comparePasswords() ? "" : "Passwords do not match!"}</label>
                                        <input name={"confirmPassword"} type="password" placeholder='Repeat Password' value={confirmPassword} className={`p-2 font-sans w-full border`} onChange={(event) => setConfirmPassword(event.target.value)} />
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-2 w-full rounded-sm bg-button-green px-4 py-2 text-2xl font-mono font-medium text-slate-100"
                                        onClick={() => {
                                            sendRequestToCreateUser().catch((error) => {
                                                // TODO: setErrorMessage('An error occurred while creating your account. Please try again.');
                                              });
                                          }}
                                    >
                                        Go
                                    </button>
                                    <button onClick={() => openLoginDialog()} className={"text-uppercase p-2 bg-slate-200 rounded-md mt-2 font-sans"}>I already have an account</button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}