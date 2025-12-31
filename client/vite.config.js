import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // automatically opens in browser on npm run dev
  },
  resolve: {
    alias: {
      '@': '/src', // allows import like "@/pages/Signup.jsx"
    },
  },
});
