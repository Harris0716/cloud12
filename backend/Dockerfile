FROM node:18-alpine

WORKDIR /backend

COPY package*.json .

RUN npm install

EXPOSE 8000

COPY . .

CMD ["node", "server.js"]