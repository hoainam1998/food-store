import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CREATE_CATEGORY,
  PAGINATION_CATEGORY,
} from '@share/patterns/category.pattern';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { IResponse } from '@share';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ControllerWrapper } from './decorators/controller-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

@WrapperWithLogger
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @MessagePattern({ cmd: CREATE_CATEGORY })
  @ControllerWrapper
  create(category: CategoryInDTO): Observable<AxiosResponse<IResponse>> {
    return this.categoryService.create(category);
  }

  @MessagePattern({ cmd: PAGINATION_CATEGORY })
  @ControllerWrapper
  pagination(
    pagination: PaginationDTO,
  ): Observable<AxiosResponse<CategoryOutDTO[]>> {
    return this.categoryService.pagination(pagination);
  }
}
