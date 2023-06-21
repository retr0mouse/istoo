import Head from "next/head";
import { Canvas } from "~/components/Canvas";

export default function CreatePlan() {
    return (
        <>
            <Head>
                <title>Istoo - Create Plan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
                <h1 className="mb-24 text-center text-3xl font-extrabold tracking-tight text-slate-700 sm:text-5xl">
                    Create a plan of your restaraunt!
                </h1>
                <input type="text" placeholder="Restaurant title" className="h-12 p-2 rounded-sm" />
            </main>
        </>

    );
}