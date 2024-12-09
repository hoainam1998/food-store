import {
  Body,
  Controller,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryDto } from '@share/dto/category.dto';
import { ImageUpload } from '@share/decorators/param/image-upload/image-upload.decorator';
import { plainToClass } from 'class-transformer';
import { IResponse } from '@share';
import { Observable, of } from 'rxjs';

@Controller('category')
export class CategoryController {
  private readonly logger: Logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('avatar'))
  addCategory(
    @Body() category: CategoryDto,
    @ImageUpload() file: Express.Multer.File,
  ): Observable<IResponse> {
    try {
      this.logger.log('Request income category gateway');
      return this.categoryService.create(
        plainToClass(CategoryDto, { ...category, avatar: file }),
      );
    } catch (err) {
      this.logger.error(err.message);
      return of({
        message: 'Something got error at category service',
      });
    }
  }
}
