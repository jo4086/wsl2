import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← 핵심 설정
    port: 5173, // 필요 시 고정 포트 지정
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@types': resolve(__dirname, 'src/types/'),
      '@scss': resolve(__dirname, './src/styles/scss'),
      '@styles': resolve(__dirname, './src/styles'),
      '@components': resolve(__dirname, './src/components'),
      '@domain': resolve(__dirname, './src/domain'),
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
