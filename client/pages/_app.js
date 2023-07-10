// app.js

import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Login from "./login";
import Signup from "./signup";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Redirect to login page if not logged in and not on the login or sign-up page
      if (!isLoggedIn && !["/login", "/signup"].includes(router.pathname)) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, router.pathname]);

  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        {isLoggedIn ? (
          <>
            <Navbar />
            <div className="pt-65">
              <Component {...pageProps} />
            </div>
            {/* <Footer /> */}
          </>
        ) : (
          <>
            {router.pathname === "/login" && (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )}
            {router.pathname === "/signup" && (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            )}
          </>
        )}
      </div>
      <Script
        src="https://kit.fontawesome.com/d45b25ceeb.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  );
};

export default MyApp;
