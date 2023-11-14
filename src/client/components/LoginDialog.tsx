import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export function LoginDialog() {
    let [isOpen, setIsOpen] = useState(false);

    function closeDialog() {
        setIsOpen(false);
    }

    function openDialog() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="relative inset-0 flex items-center justify-center w-1/3 h-10">
                <button
                    type="button"
                    onClick={openDialog}
                    className="font-sans h-10 w-24"
                >
                    Log In
                </button>
            </div>

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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-14 text-left align-middle shadow-xl transition-all">                                    
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl font-logo font-bold text-gray-900"
                                    >
                                        Log in to Istoo
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col w-full gap-2">
                                        <input type="text" placeholder='Email or username' className={`p-2 font-mono w-full border`} />
                                        <input type="text" placeholder='Password' className={`p-2 font-mono w-full border`} /> 
                                    </div>
                                    <div>
                                        <input className="appearance-none checked:bg-button-green" type="radio" id="remember" />
                                        <label className="font-mono ml-4" htmlFor="remember">Remember me</label>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-2 w-full rounded-sm bg-button-green px-4 py-2 text-2xl font-mono font-medium text-slate-100"
                                        onClick={closeDialog}
                                    >
                                        Go
                                    </button>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
