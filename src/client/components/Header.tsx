import Link from "next/link";
import CitiesCombobox from "./CitiesCombobox";
import LoginDialog from "./LoginDialog";
import { UserIcon } from "@heroicons/react/20/solid";

export default function Header({ isHome }) {
    return (
        <>
            <header className="bg-header-green flex justify-between w-full h-18 py-2 px-4 items-center gap-12">
                <div className="flex justify-between lg:items-center items-start flex-col lg:flex-row gap-5">
                    <Link href={"./"} className="">
                        <h1 className={`w-full font-logo self-center uppercase font-extrabold tracking-tight text-slate-800 text-4xl`}>
                            istoo.
                        </h1>
                    </Link>
                    <div className={`hidden ${!isHome ? "lg:flex" : "null"}`}>
                        <CitiesCombobox />
                    </div>
                </div>
                {!isHome ? (
                    <>
                        <div className="flex-grow self-center">
                            <input placeholder="Search in Istoo..." type="text" className={`outline-none font-mono rounded py-2 px-4 w-full`} />
                        </div>
                        <div className="hidden lg:flex gap-2 self-center items-center w-48">
                            <LoginDialog />
                            <button className={`w-1/2 h-10 bg-button-green rounded p-2 text-slate-100`}><span className={`font-mono`}>Sign up</span></button>
                        </div>
                    </>
                ) : null}
                <button className="w-10 lg:hidden border rounded-full bg-white mr-2">
                    <UserIcon className="w-10 h-10 p-1"/>
                </button>
            </header>
            <div className={`flex ${!isHome ? "lg:hidden" : "null"} mt-3 ml-3`}>
                <CitiesCombobox />
            </div>
        </>
    );
}
