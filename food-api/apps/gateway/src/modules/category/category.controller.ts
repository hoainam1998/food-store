import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from '@share/decorators/param/image-upload/image-upload.decorator';
import { catchError, Observable } from 'rxjs';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { IResponse } from '@share';
import { plainToClass } from 'class-transformer';
import { LoggerService } from '@share/logger/logger.service';

@Controller('category')
export class CategoryController {
  private readonly logger = new LoggerService(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('avatar'))
  addCategory(
    @Body() category: CategoryInDTO,
    @ImageUpload() file: Express.Multer.File,
  ): Observable<IResponse> {
    try {
      this.logger.log('Calling category service!');
      return this.categoryService
        .create(plainToClass(CategoryInDTO, { ...category, avatar: file }))
        .pipe(
          catchError(async (error) => {
            this.logger.log(
              `Called to category microservice failed width error: ${error.message}`,
            );
            throw new BadRequestException(error.message);
          }),
        );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
