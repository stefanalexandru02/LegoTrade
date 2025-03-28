import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), mkcert(),tailwindcss(),],
  server: {
    port: 44449,
    host: 'localhost',
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7049',
        secure: false
      },
      '/weatherforecast': {
        target: 'https://localhost:7049',
        secure: false
      }
    }
  },
  preview: {
    port: 44449,
    host: 'localhost',
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7049',
        secure: false
      },
      '/weatherforecast': {
        target: 'https://localhost:7049',
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  }
});
