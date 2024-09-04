# Makefile for managing the Vue-Capacitor Docker setup
#
# Usage:
#   make build          - Build the Docker image with no cache
#   make up             - Start the Docker container with build
#   make apk            - Run the APK build script in the Android builder container
#   make run sh         - Start the Vue-Capacitor container and run a shell inside it
#   make shell          - Execute a shell inside the running Vue-Capacitor container
#   make clean          - Stop and clean up Docker resources
#
# Logging:
#   To log command output to a file and display on console, add --logs to any command:
#   Example: make up -- --logs
#
#   Logs are saved in docker/build.log and also shown in build.log.
#
# Environment:
#   The .env file is generated dynamically by the generate-env target before each command.

generate-env:
	chmod +x scripts/generate-env.sh
	./scripts/generate-env.sh

define run-with-logs
	$(if $(filter --logs,$(MAKECMDGOALS)),> docker/build.log && $(1) 2>&1 | tee -a docker/build.log,$(1))
endef

build: generate-env
	$(call run-with-logs,docker compose -f docker/docker-compose.yml build --no-cache)

up: generate-env
	$(call run-with-logs,docker-compose -f docker/docker-compose.yml up --build vue-capacitor)

apk: generate-env
	$(call run-with-logs,docker-compose -f docker/docker-compose.yml run android-builder ./docker/scripts/build-apk.sh)

run sh: generate-env
	$(call run-with-logs,docker-compose -f docker/docker-compose.yml run -p 8080:8080 vue-capacitor sh)

shell: generate-env
	$(call run-with-logs,docker-compose -f docker/docker-compose.yml exec vue-capacitor sh)

clean:
	$(call run-with-logs,docker-compose -f docker/docker-compose.yml down --rmi local -v --remove-orphans)

.PHONY: $(MAKECMDGOALS)
