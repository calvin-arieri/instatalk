import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Login from './login';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn && router.pathname !== '/login') {
        router.push('/login');
      }
      localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    }
  }, [isLoading, isLoggedIn, router.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <Script src="https://kit.fontawesome.com/d45b25ceeb.js" crossOrigin="anonymous" />
    </ThemeProvider>
  );
};

export default MyApp;
