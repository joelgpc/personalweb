import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import App from './App';
import './index.css';
import './i18n';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

async function init() {
  try {
    // Precarga de recursos críticos
    await Promise.all([
      // Asegurarse de que i18n esté inicializado
      import('./i18n'),
      // Otros recursos críticos que necesiten precargarse
    ]);

    // Recuperar el tema preferido del usuario
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', 
      storedTheme === 'dark' || (!storedTheme && prefersDark)
    );

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error('Error initializing app:', error);
    // Mostrar un mensaje de error amigable al usuario
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          color: #374151;
          padding: 1rem;
        ">
          <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">
            Lo sentimos, ha ocurrido un error al cargar la aplicación
          </h1>
          <p style="max-width: 28rem;">
            Por favor, intente recargar la página. Si el problema persiste, 
            póngase en contacto con el soporte técnico.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              margin-top: 1rem;
              padding: 0.5rem 1rem;
              background-color: #3B82F6;
              color: white;
              border: none;
              border-radius: 0.375rem;
              cursor: pointer;
            "
          >
            Recargar página
          </button>
        </div>
      `;
    }
  }
}

// Manejar errores no capturados
window.addEventListener('unhandledrejection', event => {
  console.warn('Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

// Iniciar la aplicación
init();
