/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_ENABLE_RECAPTCHA?: string;
  readonly VITE_RATE_LIMIT_MAX_ATTEMPTS?: string;
  readonly VITE_RATE_LIMIT_WINDOW_MS?: string;
  readonly VITE_RATE_LIMIT_BLOCK_DURATION_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}