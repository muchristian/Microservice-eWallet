## Introduction

Tekana-eWallet are apis for managing your money digitally, with basic functionality such as registering personal information, creating and reading your wallet, making transactions and retrieving your transactions history.

It is implemented in microservice architecture using RabbitMQ as an event stream

## Mission

The mission is re-design and build from scratch a backend solution for a legacy platform using top notch back-end stack, that serves 1 million customers around the world

## Strategy

- Understand current and required implementation:

  Meet the business team to understand the current system situation and problems, as well as business requirements

- Create tickets for tasks:

  Sit with the product owner or scrum master to add on backlog all the tasks and set deadline for each

- Design the system architecture:

  Brainstorm with tech team, on system workflow and implementation and have common understanding on best practices should be followed.

  Best practices:

  - Remove consoles
  - set static type to variable/functions etc..
  - Api documentation using swagger
  - Write integration tests
  - Automated CI/CD

  We may several system architecture such as:

  - System Design (Microservice)
  - Database Diagram
  - UI/UX

- Determine tech stack:

  List all tech stack to be used, for both backend and frontend team based on each stack performance and how they can serve well customers.

- Implement the back-end:

  Start by setting up the codebase and proceed with implementing the task, by following the best practices
  And delivery workflow (agile methodology).
  Write integration test as you accomplish the task

- Integrate with the front-end:

  Work hand in hand with front-end team to implement apis which align with frontend requirements.

- Deploy and test the pilot system:

  Deploy the pilot system to a staging environment by first running integration test through pipeline to ensure that all tasks are working as expected.
  Address any issue discovered abd create a ticket for it on backlog.
  Fix it and push it in fix-branch, and once been tested merge it in main branch

- Do manual tests for pilot system:
  Test the pilot manually to ensure that the system is responsive, user friendly, reliable(speed to process).

- Launch the new system to all users:
  Once the tests phase is successful, launch the system to be accessible by everyone.
  Continue to monitor the system and address any issues come along the way.

## Functionality

- [x] Register customer `http://localhost:3000/api/customer` - it also creating a wallet for a customer
- [x] Get a customer `http://localhost:3000/api/customer/:id`
- [x] Get a wallet `http://localhost:3000/api/wallet/:id`
- [x] Make a transaction `http://localhost:3000/api/transaction`
- [x] Get all transactions `http://localhost:3000/api/transaction`

## Installation Guide

To install this project you have to clone into your local machine first.

### Requirements

> Make sure you have docker installed

> If you have postgres installed in your local machine, you first stop it by running `sudo service postgresql stop`, to not conflict with postgres db image port.

### Pre-setup

Create a `.env` file then copy and paste data from `.env-example` into Your newly created `.env`, in project root

### Commands

Run the following command inside the project root

```
sudo docker-compose up --build
```

or

```
sudo docker-compose build

sudo docker-compose up
```

#### API documentation

```
http://localhost:3000/docs/swagger-ui/#
```

## System Designs

### Database Diagram

![image info](/system-design/erd.png)

### System Workflow

![image info](/system-design/system-architecture.png)
