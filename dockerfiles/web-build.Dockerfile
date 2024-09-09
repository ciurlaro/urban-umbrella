FROM node:20-alpine AS build

COPY app /app

WORKDIR /app

RUN npm install && npm install @vue/cli-service

CMD npx vue-cli-service build
