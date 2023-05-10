
FROM node:16.16-slim

WORKDIR /app/customer_service-rest-api

COPY . .

RUN yarn install

EXPOSE 3006

# RUN yarn build

CMD [ "yarn", "start:dev" ]