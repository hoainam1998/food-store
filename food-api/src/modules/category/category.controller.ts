import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CategoryDto } from './category.dto';
import { ImageUpload } from '@decorators/param/image-upload/image-upload.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('avatar'))
  addCategory(
    @Body() category: CategoryDto,
    @ImageUpload() file: Express.Multer.File,
  ): Promise<Category> {
    return this.categoryService.addCategory(
      plainToClass(CategoryDto, { ...category, avatar: file }),
    );
  }
}
