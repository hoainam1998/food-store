import { NestFactory } from '@nestjs/core';
import { GateWayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GateWayModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('ports.GATEWAY_PORT');
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  await app.listen(port, () =>
    Logger.log(`Gateway start at port: ${port}`, 'GatewayBootstrap'),
  );
}
bootstrap();
