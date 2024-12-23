import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Logger,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from '@share/decorators/param/image-upload/image-upload.decorator';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { IResponse } from '@share';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ControllerWrapper } from '@decorators/controller-wrapper/controller-wrapper.decorator';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar'))
  @ControllerWrapper
  addCategory(
    @Body() category: CategoryInDTO,
    @ImageUpload() file: Express.Multer.File,
  ): Observable<IResponse> {
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
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: CategoryOutDTO })
  @Post('pagination')
  @HttpCode(200)
  @ControllerWrapper
  pagination(@Body() pagination: PaginationDTO): Observable<CategoryOutDTO[]> {
    return this.categoryService.pagination(pagination);
  }
}
