import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Ensure it's accessible externally
    strictPort: true,
    allowedHosts: ['candidate-search-w76u.onrender.com'],
  },
});
