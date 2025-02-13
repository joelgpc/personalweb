import { useEffect, useState } from 'react';

interface UseScrollSpyProps {
  sectionElementRefs: React.RefObject<HTMLElement>[];
  offsetPx?: number;
}

export function useScrollSpy({ sectionElementRefs, offsetPx = 0 }: UseScrollSpyProps): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const viewHeight = window.innerHeight;

      // Encontrar la sección más visible actualmente
      let maxVisibleSection = null;
      let maxVisibleArea = 0;

      sectionElementRefs.forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
          
          // Ajustar el área visible según el offset
          const adjustedVisibleHeight = visibleHeight - (offsetPx || 0);

          if (adjustedVisibleHeight > maxVisibleArea) {
            maxVisibleArea = adjustedVisibleHeight;
            maxVisibleSection = ref.current.id;
          }
        }
      });

      setActiveSection(maxVisibleSection);
    };

    // Agregar listener para el scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Llamada inicial para establecer la sección activa
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionElementRefs, offsetPx]);

  return activeSection;
}