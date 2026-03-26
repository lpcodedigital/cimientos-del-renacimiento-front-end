# ==============================================
# 🚀 Makefile - Front Público (Cimientos)
# ==============================================

# 🧱 Configuración de Nombres
APP_NAME         := cimientos-publico
IMAGE_DEV        := $(APP_NAME)-dev:latest
IMAGE_PROD       := $(APP_NAME)-prod:latest
CONTAINER_DEV    := $(APP_NAME)-container-dev
CONTAINER_PROD   := $(APP_NAME)-container-prod

COMPOSE_BASE     := docker-compose.yml
COMPOSE_DEV      := docker-compose.override.yml

# 🎨 Colores
GREEN   := \033[0;32m
YELLOW  := \033[1;33m
BLUE    := \033[1;34m
RED     := \033[1;31m
RESET   := \033[0m

check-docker:
	@command -v docker > /dev/null 2>&1 || (echo "$(RED)❌ Docker no instalado$(RESET)" && exit 1)

# 🧩 DESARROLLO
dev: check-docker
	@echo "$(BLUE)🚧 Levantando $(CONTAINER_DEV)...$(RESET)"
	@docker compose -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up --build

# 🚀 PRODUCCIÓN TOTAL
prod: check-docker clean-local build-local prune-docker up-prod

clean-local:
	@echo "$(YELLOW)🧹 Limpiando dist anterior...$(RESET)"
	@rm -rf dist
	@yarn cache clean

build-local:
	@echo "$(BLUE)📦 Generando build en la Mac...$(RESET)"
	@yarn build

prune-docker:
	@echo "$(RED)🧼 Limpiando caché de Docker...$(RESET)"
	@docker builder prune -f

up-prod:
	@echo "$(YELLOW)🏗️ Construyendo $(IMAGE_PROD) y levantando $(CONTAINER_PROD)...$(RESET)"
	@export DOCKER_BUILDKIT=1; \
	docker compose -f $(COMPOSE_BASE) up -d --build
	@echo "$(GREEN)✨ Front Público listo en http://localhost:3000$(RESET)"

stop:
	@echo "$(RED)🛑 Deteniendo contenedores...$(RESET)"
	@docker compose stop

down:
	@echo "$(RED)🗑️ Eliminando recursos...$(RESET)"
	@docker compose down --remove-orphans

# 📘 AYUDA
help:
	@echo ""
	@echo "$(GREEN)📘 Comandos del Front Público:$(RESET)"
	@echo ""
	@echo "$(YELLOW)make dev$(RESET)       - Modo desarrollo (Puerto 5173 + Hot Reload)"
	@echo "$(YELLOW)make prod$(RESET)      - Modo producción (Nginx + Puerto 3000)"
	@echo "$(YELLOW)make down$(RESET)      - Detiene y elimina contenedores"
	@echo "$(YELLOW)make stop$(RESET)      - Solo detiene los contenedores"
	@echo ""

.DEFAULT_GOAL := help