import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: 'localhost',        // accessible via http://localhost:5173
    port: 5173,               // frontend dev server
    open: true,               // auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend API
        changeOrigin: true,
        secure: false, // allow self-signed certificates (if you later add HTTPS)
      },
    },
  },
});
