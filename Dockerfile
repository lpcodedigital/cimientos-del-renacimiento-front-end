###### Etapa 1 (Stage 1) ######

#construir la app con Node + Yarn
FROM node:22 AS build
WORKDIR /app

# Copiamos package.json y yarn.lock primero (cache de dependencias)
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install

# Copiamos todo el código
COPY . .

# Construimos el proyecto (Vite genera /dist)
RUN yarn build

###### Etapa 2 (Stage 2) ######

#servir la app con Nginx
FROM nginx:alpine

# Copiamos el build al directorio público de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
