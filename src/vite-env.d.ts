/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_DOCUMENT_API_BASE_URL: string
  readonly VITE_LOGIN_TYPE: string
  readonly VITE_USERNAME: string
  readonly VITE_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
