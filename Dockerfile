FROM node:23-alpine3.20

WORKDIR /frieren-stats-site

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]