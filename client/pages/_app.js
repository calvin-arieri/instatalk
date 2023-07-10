import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import Login from './login';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Redirect to login page if not logged in and not on the login page
      if (!isLoggedIn && router.pathname !== '/login') {
        router.push('/login');
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
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
      <Script src="https://kit.fontawesome.com/d45b25ceeb.js" crossorigin="anonymous" />
    </ThemeProvider>
  );
};

export default MyApp;
