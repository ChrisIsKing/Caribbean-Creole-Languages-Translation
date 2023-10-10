FROM node:20.8-alpine
WORKDIR /frontend
ENV PATH "/frontend/node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]