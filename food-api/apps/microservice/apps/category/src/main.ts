import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port: string = process.env.CATEGORY_MICROSERVICE_TCP_PORT;
  const app = await NestFactory.createMicroservice(CategoryModule, {
    transport: Transport.TCP,
    options: {
      port,
    },
  });
  Logger.log(
    `Category microservice start at port: ${port}`,
    'CategoryMicroserviceBootstrap',
  );
  await app.listen();
}
bootstrap();
