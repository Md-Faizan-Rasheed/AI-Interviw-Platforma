import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Optional: Opens the app in the browser on start
  },
  // define: {
  //   'process.env.NODE_ENV': JSON.stringify('development') // or 'production'
  // }
})
