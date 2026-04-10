FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

ENV DATABASE_URL="mysql://prisma:prisma@localhost:3306/prisma"

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]