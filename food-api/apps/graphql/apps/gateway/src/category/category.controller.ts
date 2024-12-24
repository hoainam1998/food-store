import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { map, Observable } from 'rxjs';
import { messageCreator } from '@share/utils';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { AxiosResponse } from 'axios';
import { IPagination, IResponse } from '@share';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ControllerWrapper } from '@decorators/controller-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

@Controller('category')
@WrapperWithLogger
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  @HttpCode(200)
  @ControllerWrapper
  createCategory(@Body() category: CategoryInDTO): Observable<IResponse> {
    return this.categoryService
      .createCategory(category)
      .pipe(
        map((response: AxiosResponse) =>
          messageCreator(response.data.data.create.message),
        ),
      );
  }

  @Post('pagination')
  @HttpCode(200)
  @ControllerWrapper
  pagination(
    @Body() pagination: PaginationDTO,
  ): Observable<IPagination<CategoryOutDTO[]>> {
    return this.categoryService
      .pagination(pagination)
      .pipe(map((response: AxiosResponse) => response.data.data.pagination));
  }
}
