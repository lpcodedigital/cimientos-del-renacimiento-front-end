# front-end-cimientos-del-renacimiento

# 🚀 Proyecto Web con Vite + React + TypeScript + Docker

Este proyecto es una aplicación web construida con **Vite**, **React**, **TypeScript** y gestionada con **Yarn** (Node.js 22).  
Además, está dockerizada para facilitar el levantamiento de entornos de **desarrollo** y **producción**.

---

## 📦 Requisitos previos

- [Node.js 22.x](https://nodejs.org/)  
- [Yarn](https://yarnpkg.com/)  
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instalación local (sin Docker)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lpcodedigital/cimientos-del-renacimiento-front-end.git
   cd repositorio

2. Instalar dependencias
   yarn install

3. Iniciar servidor de desarrollo
   yarn dev
   # El proyecto de ejecutara en http://localhost:5173

4. Construir build para producción
    yarn build
    # Los archivos optimizados se generaran en la carpeta /dist

5. Previsualizar build de producción localmente
    yarn preview

## 🐳 Uso con Docker

1. Levantar entorno de desarrollo con hot-reload habilitado
    docker-compose up --build
    # El proyecto se ejecutara en http://localhost:5173
    # Para detener: Ctrl + C
    # Para eliminar contenedores: docker-compose down

2. Levantar entorno de producción
    docker-compose -f docker-compose.yml up -d --build
    # El proyecto se ejecutara en http://localhost:3000
    # Para detener: docker-compose -f docker-compose.yml down
    # Para ver logs: docker-compose -f docker-compose.yml logs -f
    # Para eliminar contenedores: docker-compose -f docker-compose.yml down
    # Nota: En producción se usa Nginx para servir la app optimizada
    # El build optimizado se genera en /dist y es servido por Nginx
    # El Dockerfile esta configurado para producción
    # Si haces cambios al código, debes reconstruir la imagen con --build

🌍 Entornos
    Este proyecto está preparado para ejecutarse en:
    Desarrollo: código con hot-reload para facilitar pruebas.
    Producción: aplicación optimizada y servida con Nginx.

## 🌍 Despliegue en GitHub Pages
1. Instalar paquete de Vite para GitHub Pages:
    yarn add gh-pages --dev

2. Actualizar package.json agregando:
    "homepage": "https://<usuario>.github.io/<repositorio>",
    "scripts": {
      "predeploy": "yarn build",
      "deploy": "gh-pages -d dist"
    }

3. Desplegar:
    yarn deploy

NOTA:
- Reemplazar `<usuario>` y `<repositorio>` por los valores correctos.
  Esto generará una rama gh-pages con el contenido de /dist y tu app estará accesible en GitHub Pages.