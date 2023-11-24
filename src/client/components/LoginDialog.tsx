import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export default function LoginDialog( {onActivated, onDisabled, onClicked} ) {
    let [isOpen, setIsOpen] = useState(false);

    function closeDialog() {
        setIsOpen(false);
        onDisabled();
    }

    function openDialog() {
        setIsOpen(true);
    }

    function openRegisterDialog() {
        closeDialog();
        onClicked();
    }

    useEffect(() => {
        if (onActivated) {
            openDialog();
        }
    }, [onActivated]) 

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDialog}>
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
                                        Log in to Istoo
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col w-full gap-2">
                                        <input type="text" placeholder='Email or username' className={`p-2 font-sans w-full border`} />
                                        <input type="text" placeholder='Password' className={`p-2 font-sans w-full border`} />
                                    </div>
                                    <div>
                                        <input className="checked:bg-button-green" type="radio" id="remember" />
                                        <label className="font-mono ml-4" htmlFor="remember">Remember me</label>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-2 w-full rounded-sm bg-button-green px-4 py-2 text-2xl font-mono font-medium text-slate-100"
                                        onClick={closeDialog}
                                    >
                                        Go
                                    </button>
                                    <button onClick={() => openRegisterDialog()} className={"text-uppercase p-2 bg-slate-200 rounded-md mt-2 font-sans"}>Register new account</button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
