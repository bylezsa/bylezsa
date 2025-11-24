import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import MiniCart from './MiniCart';
import Footer from './Footer';
import PromoBanner from './PromoBanner';
import HelpChatButton from './HelpChatButton';

import '../styles/layout.css';

export default function Layout({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return storedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDark(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className={`layout ${dark ? 'dark' : 'light'}`}>
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
