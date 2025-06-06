import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    proxy: {
      '/auth/api': {
        target: 'http://test1.fundly.ai',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
});