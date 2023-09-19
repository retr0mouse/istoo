import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Koulen, Alegreya } from 'next/font/google'
import TablesImage from '../images/wooden-tables-leaves.jpg';
import WomanPhoneImage from '../images/woman-phone.jpg';
import ReservedImage from '../images/reserved-table.jpg';
import WoodenTables from '../images/tables.jpg';
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
      <div className="flex flex-col justify-center items-center w-full bg-gradient-to-r from-green-900 to-gray-600">
        <div className="w-4/5">
          <h1 className={`${alegreya.className} text-stone-200 text-4xl font-medium`}>Our Features</h1>
          <div className="flex flex-col md:flex-row justify-center gap-12 py-12">
            <div>
              <Image className={'w-64 h-64 object-cover rounded-sm'} src={WomanPhoneImage} alt="Picture of a woman looking at her phone" />
              <h1>Table reservation</h1>
              <p>Effortlessly book a table for any occasion in just a few clicks. </p>
            </div>
            <div>
              <Image className={'w-64 h-64 object-cover rounded-sm'} src={WoodenTables} alt="A picture of a wooden tables" />
              <h1>Waitlist Management</h1>
              <p>Manage waitlists dynamically and optimize customer seating experience.</p>
            </div>
            <div>
              <Image className={'w-64 h-64 object-cover rounded-sm'} src={ReservedImage} alt="A picture of a reserved table" />
              <h1>Real-Time Availability</h1>
              <p>Check live availability and secure your preferred spot instantly. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
