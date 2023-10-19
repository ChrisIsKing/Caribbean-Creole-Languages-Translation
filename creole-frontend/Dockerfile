FROM node:20.8-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#=RUN npm run build
EXPOSE ${FRONTEND_PORT}
CMD npm run dev --host --port ${FRONTEND_PORT}
