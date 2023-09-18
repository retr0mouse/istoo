import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Koulen, Alegreya } from 'next/font/google'
import TablesImage from '../images/wooden-tables-leaves.jpg';
import Image from "next/image";

const koulen = Koulen({
  subsets: ['latin'],
  weight: "400"
});

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: '400'
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Istoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-header-green flex items-start w-full h-12 p-2">
        <h1 className={`${koulen.className} self-center uppercase text-sm font-extrabold tracking-tight text-slate-800 sm:text-2xl`}>
          istoo.
        </h1>
      </header>
      <main className="flex min-h-screen justify-between items-center  bg-slate-100 mt-0">
        <Image className={'w-1/2'} src={TablesImage} alt={"Picture of wooden tables and green leaves hanging from a ceiling"}></Image>
        <div className={'w-1/2 flex flex-col justify-center p-24 text-start'}>
          <h1 className={`${alegreya.className} text-3xl font-extrabold`}>Book a table easily</h1>
          <h2 className={`my-8`}>Say goodbye to waiting times with our restaurant seating app. Reserve your spot hassle-free.</h2>
          <button className={`bg-button-green w-24 px-2 py-1 rounded-md`}><span className="text-white">Explore</span></button>
        </div>
      </main>
    </>
  );
}
