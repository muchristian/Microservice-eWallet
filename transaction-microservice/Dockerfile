
FROM node:16.16-slim

WORKDIR /app/transaction_service

COPY . .

RUN yarn install

EXPOSE 3003

# RUN yarn build

CMD [ "yarn", "start:dev" ]