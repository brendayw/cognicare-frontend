import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [
    react(),
  ],
});

