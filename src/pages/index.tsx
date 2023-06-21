import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  return (
    <>
      <Head>
        <title>Istoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-700 sm:text-[5rem]">
            Istoo, palun!
          </h1>
        </div>
        <Link href={"/create-plan"}><button className="mb-5 h-12 w-36 bg-blue-400 text-2xl text-slate-100 font-semibold ">Create</button></Link>
        <div className="flex flex-col gap-2">
          {
            [1, 2, 3, 4, 5].map((firstKeys: number) => {
              return (
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((secondKeys) => {
                    const [pressed, setPressed] = useState(false);
                    return (
                      <button onClick={() => pressed ? setPressed(false) : setPressed(true)}><div className={`h-12 w-12 ${pressed ? "bg-red-500 hover:bg-red-400" :"bg-green-300 hover:bg-green-200"} rounded-md p-2 border border-slate-400`} key={firstKeys + secondKeys}></div></button>
                    );
                  })}
                </div>
              );
            })
          }
        </div>
      </main>
    </>
  );
}
