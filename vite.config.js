import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import localImageUploadPlugin from './vite-plugins/local-image-upload.js'

export default defineConfig({
  base: "/Gen_Z_Store_Final/",
  plugins: [react(), tailwindcss(), localImageUploadPlugin()],
})