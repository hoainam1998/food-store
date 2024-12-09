import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORY_MICROSERVICE } from './category.di-token';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_MICROSERVICE,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
