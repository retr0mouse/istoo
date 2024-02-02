import Link from "next/link";
import { useState } from "react";
import CitiesCombobox, { type City } from "./CitiesCombobox";
import LoginDialog from "./LoginDialog";
import LoginPopover from "./LoginPopover";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegitrationButton";
import RegisterDialog from "./RegistrationDialog";

export default function Header({ isHome }) {
    const [selectedCity, setSelectedCity] = useState<City>();
    const [loginShow, setLoginShow] = useState<boolean>(false);
    const [registerShow, setRegisterShow] = useState<boolean>(false);

    return (
        <>
            <header className="bg-header-green flex justify-between w-full h-18 py-2 px-4 items-center gap-12">
                <div className="flex justify-between lg:items-center items-start flex-col lg:flex-row gap-5">
                    <Link href={"./"} className="">
                        <h1 className={`w-full font-logo self-center uppercase font-extrabold tracking-tight text-slate-800 text-4xl`}>
                            istoo.
                        </h1>
                    </Link>
                    <div className={`${!isHome ? "hidden lg:flex" : "hidden"}`}>
                        <CitiesCombobox selectedCity={selectedCity} onSelected={(city) => setSelectedCity(city)} />
                    </div>
                </div>
                {!isHome ? (
                    <>
                        <div className="flex-grow self-center">
                            <input placeholder="Search in Istoo..." type="text" className={`outline-none font-mono rounded py-2 px-4 w-full`} />
                        </div>
                        <div className="hidden lg:flex gap-2 self-center items-center w-48">
                            <LoginButton onClicked={() => setLoginShow(true)} />
                            <RegisterButton onClicked={() => setRegisterShow(true)}/>
                            <LoginDialog onClicked={() => setRegisterShow(true)} onActivated={loginShow} onDisabled={() => setLoginShow(false)} />
                            <RegisterDialog onClicked={() => setLoginShow(true)} onActivated={registerShow} onDisabled={() => setRegisterShow(false)} />
                        </div>
                        <LoginPopover onClicked={() => setLoginShow(true)} />

                    </>
                ) : null}
            </header>
            <div className={`${!isHome ?  "flex lg:hidden": "hidden"} mt-3 ml-3`}>
                <CitiesCombobox selectedCity={selectedCity} onSelected={(city) => setSelectedCity(city)} />
            </div>
        </>
    );
}
