import { registerAs } from '@nestjs/config';

const databaseConfig = registerAs('database', () => ({
  HOST: process.env.DATABASE_HOST,
  DATABASE_URL: process.env.DATABASE_URL,
}));

const portConfig = registerAs('ports', () => ({
  GATEWAY_PORT: process.env.GATEWAY_PORT,
  CATEGORY_MICROSERVICE_PORT: process.env.CATEGORY_MICROSERVICE_PORT,
  CATEGORY_GRAPHQL_PORT: process.env.CATEGORY_GRAPHQL_PORT,
  GRAPHQL_GATEWAY: process.env.GRAPHQL_GATEWAY,
  REDIS_SERVER_PORT: process.env.REDIS_SERVER_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
}));

export { portConfig, databaseConfig };
