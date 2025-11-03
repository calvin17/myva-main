import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        dashboard: 'http://localhost:8087/assets/remoteEntry.js',
        todo: 'http://localhost:8082/assets/remoteEntry.js',
        cricket: 'http://localhost:8083/assets/remoteEntry.js',
        auth: 'http://localhost:8084/assets/remoteEntry.js',
        et: 'http://localhost:8085/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    open: true,
  },
});