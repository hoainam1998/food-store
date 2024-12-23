import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CATEGORY_MICROSERVICE } from './category.di-token';
import { Observable } from 'rxjs';
import { IResponse } from '@share';
import { CategoryDto } from '@share/dto/category.dto';
import {
  CREATE_CATEGORY,
  PAGINATION_CATEGORY,
} from '@share/patterns/category.pattern';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ServiceWrapper } from '@decorators/service-wrapper/service-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

@Injectable()
@WrapperWithLogger
export class CategoryService {
  constructor(
    @Inject(CATEGORY_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  @ServiceWrapper
  create(category: CategoryDto): Observable<IResponse> {
    return this.client.send({ cmd: CREATE_CATEGORY }, category);
  }

  @ServiceWrapper
  pagination(pagination: PaginationDTO): Observable<CategoryOutDTO[]> {
    return this.client.send({ cmd: PAGINATION_CATEGORY }, pagination);
  }
}
