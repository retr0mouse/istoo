import { ReactElement, useState } from "react";
import CitiesCombobox from "../../components/CitiesCombobox";
import { LoginDialog } from "../../components/loginDialog";

export default function Home(): ReactElement {
    const [city, setCity] = useState("Tallinn");
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <header className="bg-header-green flex justify-between w-full h-12 p-2 items-center gap-12">
                <div className="flex gap-6 md:w-2/3 justify-between">
                    <h1 className={`font-sans self-center uppercase text-sm font-extrabold tracking-tight text-slate-800 sm:text-2xl`}>
                        istoo.
                    </h1>
                    <CitiesCombobox />
                </div>
                <input placeholder="Search in Istoo..." type="text" className={`w-2/3 rounded p-2`} />
                <div className="flex gap-6 items-center">
                    <LoginDialog/>
                    <button className={`w-24 h-10 bg-button-green rounded p-2 text-slate-100`}><span className={`font-sans`}>Sign up</span></button>
                </div>
            </header>
            <main className="flex flex-col justify-center text-center h-screen">
                <h1 className="font-mono text-5xl">Soon something will be here.</h1>
                <h2 className="font-mono text-3xl">just wait</h2>
                {/* <button className={`bg-slate-100 flex px-2 rounded items-center justify-between w-24`} onClick={() => setShowOptions(!showOptions)}>
                    <Image className={`w-6`} src={LocationPinImage} alt={"Vector image of location pin"} />
                    <div className={`flex flex-col text-start`}>
                        <span className={`text-sm font-medium`}>City:</span>
                        <span className={`font-sans text-sm text-green-600 font-medium`}>{city}</span>
                    </div>
                </button> */}
            </main>
        </>
    )

    function changeCity(city: string): void {
        setCity(city);
        setShowOptions(false);
    }
}
