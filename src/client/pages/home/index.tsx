import { ReactElement } from "react";
import Header from "components/Header";

export default function Home(): ReactElement {
    return (
        <>
            <Header 
                isHome={false}
            />
            <main className="flex flex-col justify-center text-center h-screen">
                <h1 className="font-mono text-5xl">Soon something will be here.</h1>
                <h2 className="font-mono text-3xl">just wait</h2>
            </main>
        </>
    )
}
