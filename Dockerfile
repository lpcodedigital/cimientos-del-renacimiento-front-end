# ==========================================
# 🏗️ ETAPA 1: Build (Construcción)
# ==========================================
FROM node:22-alpine AS build
WORKDIR /app

# Cache de dependencias
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Copiamos código y construimos
COPY . .
RUN yarn build

# ==========================================
# 🚀 ETAPA 2: Producción (Nginx)
# ==========================================
FROM nginx:alpine AS prod
# Limpiamos el directorio por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*
# Copiamos el build generado en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html
# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ==========================================
# 🛠️ ETAPA 3: Desarrollo (Vite Hot Reload)
# ==========================================
FROM node:22-alpine AS dev
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --network-timeout 1000000
COPY . .
EXPOSE 5173
CMD ["yarn", "dev", "--host", "0.0.0.0"]