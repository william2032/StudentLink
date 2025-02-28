import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(),
        tailwindcss()],
    server: {
        watch: {
            usePolling: true, // Ensures changes are detected
        },
        hmr: {
            overlay: false, // Prevents error overlay from freezing reload
        },
    },
})
