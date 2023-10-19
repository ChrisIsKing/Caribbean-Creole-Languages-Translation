FROM node:20.8-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#=RUN npm run build
ARG FRONTEND_PORT
EXPOSE ${FRONTEND_PORT}
ENV FRONTEND_PORT=${FRONTEND_PORT}
CMD npm run dev -- --port=${FRONTEND_PORT}
