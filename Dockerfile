FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 8080

CMD node src/main.js
