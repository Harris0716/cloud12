FROM node:18-alpine

WORKDIR /frontend

COPY package*.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]