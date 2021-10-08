import "../styles/globals.css";
import type { AppProps } from "next/app";
import SearchAppBar from "../components/AppSearchBar";
import React from "react";
import Footer from "../components/Footer";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({
    palette: { secondary: { main: "#000000" } },
  });
  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar />
      <div style={{ minHeight: "calc(100vh - 250px)" }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </ThemeProvider>
  );
}
export default MyApp;
