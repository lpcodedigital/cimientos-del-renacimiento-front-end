import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/front-end-cimientos-del-renacimiento/', //manolo-94
  //base: '/cimientos-del-renacimiento-front-end/', //lpcodedigital
  base: './', // clave :rutas relativas para producion
})
