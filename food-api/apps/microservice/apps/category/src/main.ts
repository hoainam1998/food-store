import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CategoryModule, {
    transport: Transport.TCP,
  });
  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
