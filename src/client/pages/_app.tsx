import { type AppProps } from "next/app";
import "../../styles/globals.css";
import { Alegreya, Koulen, Lato } from "next/font/google";

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: "500",
});

const lato = Lato({
  subsets: ['latin'],
  weight: "400",
})

const koulen = Koulen({
  subsets: ['latin'],
  weight: "400",
});



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-koulen: ${koulen.style.fontFamily};
            --font-alegreya: ${alegreya.style.fontFamily};
            --font-lato: ${lato.style.fontFamily}
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
