import { useEffect, useState } from 'react';

export const useScrollSpy = (ids: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Obtener la altura del viewport
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      const sections = ids.map(id => {
        const element = document.getElementById(id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const offset = rect.top + scrollPosition;
        const height = rect.height;
        
        return {
          id,
          offset,
          height
        };
      }).filter(Boolean);

      // Encontrar la sección activa basada en la posición del scroll
      const currentSection = sections.find((section, index) => {
        const nextSection = sections[index + 1];
        const sectionTop = section!.offset;
        const viewThreshold = viewportHeight * 0.3; // 30% del viewport
        
        if (!nextSection) {
          // Para la última sección
          return scrollPosition + viewThreshold >= sectionTop;
        }
        
        const sectionBottom = nextSection.offset;
        return scrollPosition + viewThreshold >= sectionTop && scrollPosition + viewThreshold < sectionBottom;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Manejar el scroll inicial
    const handleInitialScroll = () => {
      handleScroll();
      // Desactivar el listener después del primer scroll
      window.removeEventListener('load', handleInitialScroll);
    };

    // Escuchar eventos
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleInitialScroll);
    window.addEventListener('resize', handleScroll, { passive: true });

    // Ejecutar una vez al montar
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleInitialScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids]);

  return activeSection;
};