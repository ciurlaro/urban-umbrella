FROM node:20-alpine AS base

COPY app /app

WORKDIR /app

RUN npm install

EXPOSE 3000
