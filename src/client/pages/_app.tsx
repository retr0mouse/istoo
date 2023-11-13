import { AppProps } from "next/app";
import "../../styles/globals.css";
import { Alegreya, Koulen, Lato } from "next/font/google";

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: "500",
  variable: '--font-alegreya'
});

const lato = Lato({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-lato'
})

const koulen = Koulen({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-koulen'
});



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${alegreya.variable} ${lato.variable} ${koulen.variable}`}>
      <Component {...pageProps} />
    </main>
  );
};
