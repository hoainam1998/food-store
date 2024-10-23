import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { UploadFileModule } from '@upload-file/upload-file.module';

@Module({
  providers: [CategoryService],
  imports: [PrismaModule, UploadFileModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
