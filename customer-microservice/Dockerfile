
FROM node:16.16-slim

WORKDIR /app/customer_service

COPY . .

RUN yarn install

EXPOSE 3001

# RUN yarn build

CMD [ "yarn", "start:dev" ]