import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Intro from './components/Intro';
import { TransitionProvider } from './lib/Transition';
import { useSmoothScroll, scrollTop } from './lib/smooth';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import Property from './pages/Property';
import Sell from './pages/Sell';
import Contact from './pages/Contact';
import BarcelonaPage from './pages/Barcelona';

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
    >
      {children}
      <Footer />
    </motion.main>
  );
}

export default function App() {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    scrollTop(true);
  }, [location.pathname]);

  // dev only: ?y=1500 jumps to a scroll offset, for visual checks
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const y = new URLSearchParams(location.search).get('y');
    if (y) {
      const t = setTimeout(() => window.scrollTo(0, Number(y)), 350);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
    <TransitionProvider>
      <Intro />
      <Cursor />
      <div className="grain" />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/collection" element={<Page><CollectionPage /></Page>} />
          <Route path="/barcelona" element={<Page><BarcelonaPage /></Page>} />
          <Route path="/property/:slug" element={<Page><Property /></Page>} />
          <Route path="/sell" element={<Page><Sell /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
        </Routes>
      </AnimatePresence>
    </TransitionProvider>
  );
}
