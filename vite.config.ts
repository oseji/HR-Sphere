import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   host: true,  // This allows access from outside the container
  //   port: 4173,  // Ensure the port matches the EXPOSE port in Dockerfile
  // },
})
