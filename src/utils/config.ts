export const config = {
  AUTH_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  DOCUMENT_API_BASE_URL: import.meta.env.VITE_DOCUMENT_API_BASE_URL,
  CREDIT_ENGINE_API_BASE_URL: 'https://test1.fundly.ai/credit-engine/api/v1',
  APP_ID: '',
  APP_VERSION: '',
  LOGIN_TYPE: import.meta.env.VITE_LOGIN_TYPE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization'
  }
} as const;