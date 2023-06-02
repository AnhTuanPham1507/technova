NAME = otribe_backend
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))
CURRENT_BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)
DOCKER_FILE ?= docker-compose.yml

info:
	$(info CURRENT_BRANCH: $(CURRENT_BRANCH))
	$(info DOCKER_FILE: $(DOCKER_FILE))

dev_up:
	docker-compose -f $(DOCKER_FILE) up -d --remove-orphans
	yarn start:dev

use:
	nvm use

bootstrap:
	cp .env.example .env
	cp .docker.env.example .docker.env
  #cp .envrc.example .envrc
# make sure execute nvm use or installed node v14.20.0
	yarn
# make sure intalled direnv
	direnv allow .
	docker login -u $(DOCKER_REGISTRY_USER) -p $(DOCKER_REGISTRY_PASSWORD) $(DOCKER_REGISTRY_URL)

ps:
	docker-compose ps

stop:
	docker-compose stop

stop-containers:
	docker stop $$(docker ps -a -q)

logs:
	docker-compose -f $(DOCKER_FILE) logs

ssh:
	docker-compose exec -it $(DOCKER_FILE) backend sh

dbmigrate-create:
	yarn run migration:create src/database/migrations/$(name)

dbmigrate-generate:
	yarn run migration:generate src/database/migrations/$(name)

dbmigrate-run:
	yarn run migration:run

dbmigrate-down:
	yarn run migration:revert

down:
	docker-compose -f $(DOCKER_FILE) down

build:
	rm -rf dist/** && yarn build:prod

build-image:
	docker build -f ./Dockerfile --pull -t $(name) .
