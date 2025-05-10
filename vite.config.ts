import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← 핵심 설정
    port: 5173, // 필요 시 고정 포트 지정
  },
})
