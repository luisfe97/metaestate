import "../styles/variables-green.css";
import "../styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import { Gsapscroll } from "@/components/Gsapscroll";
import React, { useEffect, useRef } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>MetaEstate</title>
        <meta content name="description" />
        <meta content name="keywords" />
        {/* Favicons */}
        {/* Google Fonts */}
        {/* Vendor CSS Files */}
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <Gsapscroll />
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}
