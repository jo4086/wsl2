import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← 핵심 설정
    port: 5173, // 필요 시 고정 포트 지정
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@scss': path.resolve(__dirname, './src/styles/scss'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // api: 'legacy',
        // includePaths: ['src'],
        additionalData: `@use "@styles/scss/forward.scss" as style;`,
      },
    },
  },
})
