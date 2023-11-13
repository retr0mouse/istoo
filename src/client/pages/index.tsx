import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import ReservedImage from '../../images/reserved-table.jpg';
import WoodenTables from '../../images/tables.jpg';
import WomanPhoneImage from '../../images/woman-phone.jpg';
import TablesImage from '../../images/wooden-tables-leaves.jpg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Istoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-header-green flex items-start w-full h-12 p-2">
        <h1 className={`font-logo self-center uppercase text-sm font-extrabold tracking-tight text-slate-800 sm:text-2xl`}>
          istoo.
        </h1>
      </header>
      <main className="flex justify-between max-h-screen  bg-slate-100 mt-0">
        <Image className={'hidden lg:block w-1/2 object-cover'} src={TablesImage} alt={"Picture of wooden tables and green leaves hanging from a ceiling"}></Image>
        <div className={'flex w-full lg:w-1/2 h-full flex-col justify-center p-24 text-start'}>
          <h1 className={`font-mono text-6xl font-bold`}>Book a table easily</h1>
          <h2 className={`font-mono text-2xl my-8`}>Say goodbye to waiting times with our restaurant seating app. Reserve your spot hassle-free.</h2>
          <Link href="/home"><button className={`bg-button-green w-36 py-3 rounded-md`}><span className={`font-mono font-bold text-white text-2xl`}>Explore</span></button></Link> 
        </div>
      </main>
      <div className="py-10 flex flex-col justify-center items-center w-full bg-gradient-to-r from-green-900 to-gray-600">
        <div className="w-4/5">
          <h1 className={`font-mono text-stone-200 text-center lg:text-start text-5xl font-medium`}>Our Features</h1>
          <div className="flex flex-col lg:flex-row py-12 space-x-2 justify-between">
            <div className="lg:block flex flex-col self-center w-full lg:w-1/3 h-full my-4">
              <Image className={'w-full h-72 object-cover rounded-sm self-center'} src={WomanPhoneImage} alt="Picture of a woman looking at her phone" />
              <h1 className={`font-sans text-stone-200 text-4xl font-medium my-2`}>Table reservation</h1>
              <p className={`font-mono text-slate-200 text-2xl font-medium`}>Effortlessly book a table for any occasion in just a few clicks. </p>
            </div>
            <div className="lg:block flex flex-col self-center w-full lg:w-1/3 h-full my-4">
              <Image className={'w-full h-72 object-cover rounded-sm self-center'} src={WoodenTables} alt="A picture of a wooden tables" />
              <h1 className={`font-sans text-stone-200 text-4xl font-medium my-2`}>Waitlist Management</h1>
              <p className={`font-mono text-slate-200 text-2xl font-medium`}>Manage waitlists dynamically and optimize customer seating experience.</p>
            </div>
            <div className="lg:block flex flex-col self-center w-full lg:w-1/3 h-full my-4">
              <Image className={'w-full h-72 object-cover rounded-sm self-center'} src={ReservedImage} alt="A picture of a reserved table" />
              <h1 className={`font-sans text-stone-200 text-4xl font-medium my-2`}>Real-Time Availability</h1>
              <p className={`font-mono text-slate-200 text-2xl font-medium`}>Check live availability and secure your preferred spot instantly. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
