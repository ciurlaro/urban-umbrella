# Makefile for managing the Vue-Capacitor Docker setup
#
# Usage:
#   make dist      - Run the web build process
#   make web-serve      - Start the web server
#   make web-run        - Start the web server and run a shell inside it
#   make web-exec       - Execute a shell inside an already running web server container
#   make apk-build      - Run the 'apk' build process
#   make apk-run        - Start the Android builder and run a shell inside it
#   make clean          - Stop and clean up local Docker resources
#   make prune          - Stop and clean up global Docker resources (BE AWARE! All Docker resources will be affected!)
#
# Logging:
#   To log command output to a file and display on console, add --logs to any command:
#   Example: make web-serve -- --logs
#
#   Logs are saved in logs/*.log and also shown in the console.
#
# Environment:
#   The .env file is generated dynamically by the generate-env target before each command.


generate-env:
	chmod +x scripts/generate-env.sh
	./scripts/generate-env.sh

define run-with-logs
	$(if $(filter --logs,$(MAKECMDGOALS)),> logs/$(shell date +%s).log && $(1) 2>&1 | tee -a logs/.log,$(1))
endef

web-build: generate-env
	$(call run-with-logs,docker compose up --build web-builder)

web-serve: generate-env
	$(call run-with-logs,docker compose up --build web-server)

web-build-run: generate-env
	$(call run-with-logs,docker compose run -p 8080:8080 web-builder sh)

web-serve-run: generate-env
	$(call run-with-logs,docker compose run -p 8080:8080 web-server sh)

web-serve-exec: generate-env
	$(call run-with-logs,docker compose exec web-server sh)

apk-build: generate-env
	$(call run-with-logs,docker compose run android-builder)

apk-run: generate-env
	$(call run-with-logs,docker compose run -p 8080:8080 android-builder sh)

clean:
	$(call run-with-logs,docker compose stop)
	$(call run-with-logs,docker compose down --rmi local -v --remove-orphans)

prune:
	make clean
	$(call run-with-logs,docker system prune --all --volumes --force)


.PHONY: $(MAKECMDGOALS)
