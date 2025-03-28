import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'

const target = 'https://localhost:7049';

const proxy = {
  '/api': { target, secure: false },
  '/weatherforecast': { target, secure: false },
  '/_configuration': { target, secure: false },
  '/.well-known': { target, secure: false },
  '/Identity': { target, secure: false },
  '/connect': { target, secure: false },
  '/ApplyDatabaseMigrations': { target, secure: false },
  '/_framework': { target, secure: false }
};

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  server: {
    port: 44449,
    host: 'localhost',
    https: true,
    proxy: proxy,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 44449,
    host: 'localhost',
    https: true,
    proxy: proxy,
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  }
});
