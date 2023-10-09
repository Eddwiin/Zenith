# ----------------------------
# build from source
# ----------------------------
FROM node:18 AS build

WORKDIR /app

COPY package*.json .
RUN NODE_ENV=development npm install

COPY . .
RUN npm run build
