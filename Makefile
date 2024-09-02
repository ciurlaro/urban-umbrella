# Makefile

# Generate the .env file dynamically before any Docker Compose commands
generate-env:
	chmod +x generate-env.sh
	./generate-env.sh

build: generate-env
	docker compose build --no-cache

up: generate-env
	docker-compose up --build vue-capacitor

apk: generate-env
	docker-compose run android-builder ./build-apk.sh

run sh: generate-env
	docker-compose run -p 8080:8080 vue-capacitor sh

shell: generate-env
	docker-compose exec vue-capacitor sh

clean:
	docker-compose down --rmi local -v --remove-orphans
