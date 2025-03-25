import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    extensions: ['.js', 'jsx', '.vue', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
