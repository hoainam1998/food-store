import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('CATEGORY_GRAPHQL_PORT');
  await app.listen(port, () =>
    Logger.log(`Category graphql start at port: ${port}`),
  );
}
bootstrap();
