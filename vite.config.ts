import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
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