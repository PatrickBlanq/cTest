import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/webapi': {
        target: 'https://localhost:44376',
        changeOrigin: true,
        secure: false, // 如果使用自签名证书, 设置为false
      },
    },
  },
});
