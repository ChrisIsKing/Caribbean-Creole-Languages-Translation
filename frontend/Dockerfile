FROM node:20.8-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build
CMD ["npm", "run" ,"start"]