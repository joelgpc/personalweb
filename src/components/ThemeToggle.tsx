import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-gray-100 dark:bg-gray-800 backdrop-blur-lg rounded-full shadow-lg
        hover:bg-corporateBlue-50 dark:hover:bg-corporateBlue-900/20
        transition-all duration-300
        border border-gray-200 dark:border-gray-700
        focus:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500"
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-corporateBlue-400" aria-hidden="true" />
      ) : (
        <Moon className="w-6 h-6 text-corporateBlue-600" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
