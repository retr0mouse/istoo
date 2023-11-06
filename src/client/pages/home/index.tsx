import Link from "next/link";
import { ReactElement, useState } from "react";
import { koulen } from '../../fonts/koulen';
import { alegreya } from "../../fonts/alegreya";
import Image from "next/image";
import LocationPinImage from "../../../images/location-pin.svg";

export default function Home(): ReactElement {
    const [city, setCity] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const cities = ["Tallinn", "Tartu"];

    return (
        <>
            <header className="bg-header-green flex justify-between w-full h-12 p-2 items-center gap-36">
                <div className="flex gap-6">
                    <h1 className={`${koulen.className} self-center uppercase text-sm font-extrabold tracking-tight text-slate-800 sm:text-2xl`}>
                        istoo.
                    </h1>
                    <button className={`bg-slate-100 flex px-2 rounded items-center justify-between w-24`} onClick={() => setShowOptions(!showOptions)}>
                        <Image className={`w-6`} src={LocationPinImage} alt={"Vector image of location pin"}/>
                        <div className={`flex flex-col text-start`}>
                            <span className={`font-${alegreya} text-sm font-medium`}>City:</span>
                            <span className={`font-${alegreya} text-sm text-green-600 font-medium`}>{city}</span>
                        </div>
                    </button>
                    {showOptions && (
                        <div className={`absolute top-14 left-16 flex flex-col bg-white rounded-md border-2 border-slate-600`} >
                            {cities.map((city, index) => {
                                return (
                                    <button className={`py-3 px-4 `} key={index} onClick={() => changeCity(city)}>{city}</button>
                                )
                            })}
                        </div>
                    )}
                </div>
                <input placeholder="Search in Istoo..." type="text" className="w-full" />
                <div className="flex gap-6">
                    <Link href={"/login"}>Log in</Link>
                    <button>Register</button>
                </div>
            </header>
        </>
    )

    function changeCity(city: string): void {
        setCity(city);
        setShowOptions(false);
    }

}
