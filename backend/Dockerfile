FROM node:lts-alpine

LABEL decription="Production image for Figure backend."

WORKDIR /usr/src/app

COPY backend/package.json .

COPY backend/yarn.lock .

RUN yarn install

COPY backend .

CMD ["yarn", "start"]
