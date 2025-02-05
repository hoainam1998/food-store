import { NestFactory } from '@nestjs/core';
import { GateWayModule } from './gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GateWayModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('ports.GATEWAY_PORT');
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port, () =>
    Logger.log(`Gateway start at port: ${port}`, 'GatewayBootstrap'),
  );
}
bootstrap();
