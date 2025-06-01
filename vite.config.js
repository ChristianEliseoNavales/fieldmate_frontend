import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '/src/Pages/Sidebar': path.resolve(__dirname, 'src/Pages/Sidebar'),
    },
  },
  server: {
    proxy: {
      '/api': 'https://backend-fieldmate.onrender.com', 
    },
  },
});
