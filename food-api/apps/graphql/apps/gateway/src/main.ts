import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('ports.GRAPHQL_GATEWAY');
  await app.listen(port, () =>
    Logger.log(`Graphql gateway start at ${port}`, 'GatewayGraphqlBootstrap'),
  );
}
bootstrap();
