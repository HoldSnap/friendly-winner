FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# порт
EXPOSE 3001

# запуск
CMD ["npm", "run", "dev"]