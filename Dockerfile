###### Etapa 1: build (Stage 1) build para producción ######

#construir la app con Node + Yarn
FROM node:22 AS build
WORKDIR /app

# Copiamos package.json y yarn.lock primero (cache de dependencias)
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install

# Copiamos todo el código
COPY . .

#Argumento para controlar el entorno
ARG NODE_ENV=production

# Construimos el proyecto solo si es producción
RUN if ["$NODE_ENV" = "production" ]; then yarn build; fi

###### Etapa 2: producción (Stage 2) app optimizada ######

#servir la app con Nginx
FROM nginx:alpine AS prod

# Copiamos el build generado al directorio público de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]

###### Etapa 3: desarrollo (Stage 3) vite dev server con  hot reload ######

# Contruimos la app para desarrollo con Node
FROM node:22-alpine AS dev

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y yarn.lock primero (cache de dependencias)
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install

# Copiamos todo el código
COPY . .

# Esponemos el puerto 80 
EXPOSE 80

# Comando por defecto para desarrollo
CMD ["yarn", "dev", "--host", "0.0.0.0"]