## Introdcution

Tekana-eWallet are apis for managing your money digitally, with basic functionaly such as registering personal information, creating and reading your wallet, making transactions and retrieving your transactions history.

## Functionality

- [x] create
- [x] retrieve
- [x] update
- [x] delete
- [x] rank

## Installation Guide

To install this project you have to clone into your local setup

### Requirements

- Node (16.x)
- DB(relational Database `you make sure to change db type in app config file based on your choice`)
- NPM

### Pre-setup

Create a `.env` file then copy and paste data from `.env-example` into Your newly created `.env`,
make sure you fill all the information according to your setup

### Commands

#### install dependencies

```shell
yarn install
```

#### Run Migration

```shell
yarn run typeorm:run
```

#### Run Application

```shell
yarn start:dev
```

### Guide

#### API documentation

```
http://localhost:3000/docs/swagger-ui/#
```
