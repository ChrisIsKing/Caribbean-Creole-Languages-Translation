FROM node:20.8-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM devforth/spa-to-http:latest
COPY --from=builder /usr/src/app/dist .
