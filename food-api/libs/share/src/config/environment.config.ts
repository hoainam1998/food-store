import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  HOST: process.env.DATABASE_HOST,
  DATABASE_URL: process.env.DATABASE_URL,
}));

export const portConfig = registerAs('ports', () => ({
  GATEWAY_PORT: process.env.GATEWAY_PORT,
  CATEGORY_MICROSERVICE_PORT: process.env.CATEGORY_MICROSERVICE_PORT,
  CATEGORY_GRAPHQL_PORT: process.env.CATEGORY_GRAPHQL_PORT,
  GRAPHQL_GATEWAY: process.env.GRAPHQL_GATEWAY,
  REDIS_SERVER_PORT: process.env.REDIS_SERVER_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
}));

export const graphqlUrl = () => ({
  CATEGORY_GRAPHQL_URL: `http://${process.env.CATEGORY_GRAPHQL_HOST}:${process.env.CATEGORY_GRAPHQL_PORT}/graphql`,
});
