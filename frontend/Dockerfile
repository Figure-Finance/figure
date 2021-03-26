FROM node:lts-alpine

LABEL decription="Production image for Figure frontend."

WORKDIR /usr/src/app

COPY frontend/package.json .

COPY frontend/yarn.lock .

RUN yarn install serve

RUN yarn install

COPY frontend .

RUN yarn build

CMD ["yarn", "start-prod"]