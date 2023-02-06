import { RmqOptions, Transport } from '@nestjs/microservices';

export const serviceConnection = (queue: string): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      ],
      queue,
      queueOptions: {
        durable: true,
      },
    },
  };
};
