import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { IResponse } from '@share';
import { HttpService } from '@nestjs/axios';
import { CategoryDto } from '@share/dto/category.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ServiceWrapper } from './decorators/service-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

@Injectable()
@WrapperWithLogger
export class CategoryService {
  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly http: HttpService,
  ) {}

  @ServiceWrapper
  create(category: CategoryDto): Observable<AxiosResponse<IResponse>> {
    return this.http.post<IResponse>('create-category', category);
  }

  @ServiceWrapper
  pagination(
    pagination: PaginationDTO,
  ): Observable<AxiosResponse<CategoryOutDTO[]>> {
    return this.http.post<any>('pagination', pagination);
  }
}
