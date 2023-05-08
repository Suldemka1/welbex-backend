FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

RUN npm install pm2 -g

COPY --chown=node:node . .


RUN npx prisma generate
RUN npx tsc --build
CMD npx prisma migrate deploy && \
  pm2 start npm --name backend -- run start