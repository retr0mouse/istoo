import CitiesCombobox from "./CitiesCombobox";
import LoginDialog from "./LoginDialog";

export default function Header() {
    return (
        <>
            <header className="bg-header-green flex justify-between w-full h-18 py-2 px-4 items-center gap-12">
                <div className="flex gap-6 md:w-2/3 justify-between">
                    <h1 className={`font-logo self-center uppercase text-sm font-extrabold tracking-tight text-slate-800 sm:text-4xl`}>
                        istoo.
                    </h1>
                    <CitiesCombobox />
                </div>
                <input placeholder="Search in Istoo..." type="text" className={`outline-none font-mono w-2/3 rounded py-2 px-4`} />
                <div className="flex gap-6 items-center">
                    <LoginDialog />
                    <button className={`w-24 h-10 bg-button-green rounded p-2 text-slate-100`}><span className={`font-mono`}>Sign up</span></button>
                </div>
            </header>
        </>
    );
}
