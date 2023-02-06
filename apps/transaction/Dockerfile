
FROM node:16.16-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3003

# RUN yarn build

CMD [ "yarn", "start:dev", "transaction"]