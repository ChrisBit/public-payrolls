import "../styles/globals.css";
import type { AppProps } from "next/app";
import SearchAppBar from "../components/AppSearchBar";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchAppBar />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
