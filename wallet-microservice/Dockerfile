
FROM node:16.16-slim

WORKDIR /app/wallet_service

COPY . .

RUN yarn install

EXPOSE 3002

# RUN yarn build

CMD [ "yarn", "start:dev" ]