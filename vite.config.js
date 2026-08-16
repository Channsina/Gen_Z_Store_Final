import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   base: "/Gen_Z_Store_Final/",
  plugins: [react(), tailwindcss()],
})
