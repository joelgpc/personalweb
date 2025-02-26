import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImageLoadingState {
  isLoaded: boolean;
  error: boolean;
  blurredSrc: string;
}

export default function ProjectImage({ src, alt, className = '' }: ProjectImageProps) {
  const [loadingState, setLoadingState] = useState<ImageLoadingState>({
    isLoaded: false,
    error: false,
    blurredSrc: ''
  });

  useEffect(() => {
    const loadTinyImage = async () => {
      try {
        const baseUrl = src.split('?')[0];
        const tinyImageUrl = `${baseUrl}?w=20`;
        const response = await fetch(tinyImageUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to load tiny image: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        setLoadingState(prev => ({
          ...prev,
          blurredSrc: url
        }));
      } catch (err) {
        console.error('Error loading tiny image:', err);
        setLoadingState(prev => ({
          ...prev,
          error: true
        }));
      }
    };

    loadTinyImage();

    return () => {
      if (loadingState.blurredSrc) {
        URL.revokeObjectURL(loadingState.blurredSrc);
      }
    };
  }, [src]);

  if (loadingState.error) {
    return (
      <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {loadingState.blurredSrc && (
        <img
          src={loadingState.blurredSrc}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-xl transform scale-110 transition-opacity duration-300 ${loadingState.isLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className} ${loadingState.isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setLoadingState(prev => ({ ...prev, isLoaded: true }))}
        onError={() => setLoadingState(prev => ({ ...prev, error: true }))}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}