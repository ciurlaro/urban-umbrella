FROM node:20-alpine AS base

COPY app /app

WORKDIR /app

RUN npm install && npm install @vue/cli-service

EXPOSE 3000
RUN npx vue-cli-service build --target app --modern
#CMD npm run serve -- --port 3000
