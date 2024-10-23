import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { UploadFileModule } from '@upload-file/upload-file.module';

@Module({
  providers: [FoodService],
  imports: [PrismaModule, UploadFileModule],
  controllers: [FoodController],
})
export class FoodModule {}
