import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { FoodService } from './modules/food/food.service';
import { FoodModule } from './modules/food/food.module';
import { CategoryService } from '../../category/src/category.service';
import { CategoryModule } from '../../category/src/category.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    PrismaModule,
    FoodModule,
    CategoryModule,
    UploadFileModule,
  ],
  providers: [PrismaService, FoodService, CategoryService],
})
export class AppModule {}
