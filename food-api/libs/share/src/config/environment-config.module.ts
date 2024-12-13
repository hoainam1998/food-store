import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, graphqlUrl, portConfig } from './environment.config';

const configModule = ConfigModule.forRoot({
  load: [databaseConfig, portConfig, graphqlUrl],
  isGlobal: true,
});

@Module({
  imports: [configModule],
})
export class EnvironmentConfigModule {}
