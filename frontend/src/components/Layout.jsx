import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import MiniCart from './MiniCart';
import Footer from './Footer';
import PromoBanner from './PromoBanner';
import HelpChatButton from './HelpChatButton';

import '../styles/colors.css';
import '../styles/globals.css';

export default function Layout({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div className="layout">
      <PromoBanner />

      <Navbar dark={dark} setDark={setDark} />

      <MiniCart />

      <main className="main-container">
        {children}
      </main>

      <HelpChatButton />

      <Footer />
    </div>
  );
}
