import { useState, useEffect, lazy, Suspense } from 'react';
import { Preloader } from './components/Preloader';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const HeroComponent = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Asegurar que la página comience desde el inicio
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    };
    
    // Ejecutar inmediatamente y después del timeout de carga
    scrollToTop();
    if (!isLoading) {
      scrollToTop();
    }
  }, [isLoading]);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className="relative bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText antialiased">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <main className="relative">
            <HeroComponent />
            <About />
            <Skills />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default App;
