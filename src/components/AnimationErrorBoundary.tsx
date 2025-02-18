import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | undefined;
}

export class AnimationErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: undefined
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Animation error:', error);
    console.error('Error info:', errorInfo);
    
    // Reiniciar el estado después de un tiempo para permitir reintentar la animación
    setTimeout(() => {
      this.setState({ hasError: false, error: undefined });
    }, 2000);
  }

  public override render() {
    const { children, fallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      // Si se proporciona un fallback, úsalo
      if (fallback) {
        return (
          <div data-error={error?.message}>
            {fallback}
          </div>
        );
      }

      // Si no hay fallback, intentar renderizar los children con información del error
      try {
        return (
          <div data-animation-error={error?.message}>
            {children}
          </div>
        );
      } catch {
        // Si falla el renderizado, mostrar un contenedor con información del error
        return (
          <div
            style={{ display: 'none' }}
            data-animation-error={error?.message}
          />
        );
      }
    }

    return children;
  }
}