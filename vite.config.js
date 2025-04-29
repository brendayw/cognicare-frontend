import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import postcss from './postcss.config'

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [
    react(),
  ],
});

