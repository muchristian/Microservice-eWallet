
FROM node:16.16-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install 

COPY . .

EXPOSE 3002

# RUN yarn build

CMD [ "yarn", "start:dev", "wallet"]