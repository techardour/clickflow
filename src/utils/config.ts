export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
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