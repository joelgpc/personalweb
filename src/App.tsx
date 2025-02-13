import { About } from './components/About';
import { Contact } from './components/Contact';
import Footer from './components/Footer';
import HeroComponent from './components/Hero';
import Navbar from './components/Navbar';
import { Portfolio } from './components/Portfolio';
import Skills from './components/Skills';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { useRef } from 'react';

const App = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <div className="bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText antialiased">
            <Navbar aboutRef={aboutRef} skillsRef={skillsRef} portfolioRef={portfolioRef} contactRef={contactRef} />
            <main id="main">
              <HeroComponent />
              <About />
              <Skills />
              <Portfolio />
              <Contact />
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
