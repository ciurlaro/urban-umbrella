FROM node:20-alpine

WORKDIR /app

COPY ./app/dependencies /app/dependencies/

RUN npm install --prefix /app/dependencies
ENV NODE_PATH=/app/dependencies/node_modules

COPY ./app/entrypoint   /app/entrypoint
COPY ./app/components   /app/components
COPY ./app/config       /app/config/

RUN cp -r ./dependencies/node_modules       /app/entrypoint
RUN cp -r ./dependencies/node_modules       /app/components

RUN mkdir /app/web-build

WORKDIR /app/dependencies

CMD npm run build -- --config /app/config/vite.config.js --outDir /app/web-build

