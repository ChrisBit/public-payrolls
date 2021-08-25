import "../styles/globals.css";
import type { AppProps } from "next/app";
import SearchAppBar from "../components/AppSearchBar";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <SearchAppBar />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
