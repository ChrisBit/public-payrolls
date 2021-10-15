import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import SearchAppBar from "../components/AppSearchBar";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import { GA_TRACKING_ID, pageview } from "../utils/gtag-utils";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({
    palette: { secondary: { main: "#000000" } },
  });
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider theme={theme}>
        <SearchAppBar />
        <div style={{ minHeight: "calc(100vh - 250px)" }}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
