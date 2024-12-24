import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IPagination, IResponse } from '@share';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { PaginationDTO } from '@share/dto/pagination.dto';
import { ServiceWrapper } from '@decorators/service-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

interface GraphqlRequestBody {
  query: string;
  variables: Record<string, any>;
}

@Injectable()
@WrapperWithLogger
export class CategoryService {
  constructor(private readonly http: HttpService) {}

  @ServiceWrapper
  createCategory(
    category: CategoryInDTO,
  ): Observable<AxiosResponse<IResponse>> {
    const requestBody: GraphqlRequestBody = {
      query: `
        mutation CreateCategory($category: CategoryInput!) {
          create(category: $category) {
            message
          }
        }`,
      variables: {
        category,
      },
    };
    return this.http.post('/', requestBody);
  }

  @ServiceWrapper
  pagination(
    pagination: PaginationDTO,
  ): Observable<AxiosResponse<IPagination<CategoryOutDTO[]>>> {
    const requestBody: GraphqlRequestBody = {
      query: `
        query CategoryPagination($pageSize: Float!, $pageNumber: Float!) {
          pagination(pageSize: $pageSize, pageNumber: $pageNumber) {
            list {
              ${pagination.queries}
            },
            total
          }
        }
      `,
      variables: {
        pageSize: pagination.pageSize,
        pageNumber: pagination.pageNumber,
      },
    };
    return this.http.post('/', requestBody);
  }
}
