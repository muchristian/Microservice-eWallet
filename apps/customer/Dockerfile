
FROM node:16.16-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3001

# RUN yarn build

CMD [ "yarn", "start:dev", "customer"]