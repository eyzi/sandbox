FROM node:alpine AS base
WORKDIR /app
COPY . .
RUN yarn build:clean

FROM node:alpine
WORKDIR /app
COPY --from=base /app .