import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',  // Ruta base, si estás desplegando en un subdirectorio, cámbialo según corresponda
  plugins: [react()],
  build: {
    outDir: 'dist',  // Directorio de salida
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',  // Archivos de assets con hash para el caché
        entryFileNames: 'assets/[name]-[hash].js',        // Archivos de entrada con hash
        chunkFileNames: 'assets/[name]-[hash].js',        // Archivos de chunk con hash
        manualChunks(id) {
          // Esta lógica separa los módulos que vienen de node_modules en fragmentos individuales
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,  // Ajusta el límite del tamaño de chunk a 1 MB
  },
});
