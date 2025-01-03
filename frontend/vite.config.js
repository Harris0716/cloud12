import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  // 加入環境變數的配置
  define: {
    __API_URL__: JSON.stringify(import.meta.env.VITE_API_URL),
  },
  // 加入開發時的代理配置（如果需要的話）
  // proxy: {
  //   '/api': {
  //     target: 'http://54.238.10.84:8000',
  //     changeOrigin: true,
  //   }
  // }
});