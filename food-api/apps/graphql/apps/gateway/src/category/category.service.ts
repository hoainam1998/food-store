import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { LoggerService } from '@share/logger/logger.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  private readonly logger = new LoggerService(CategoryService.name);
  constructor(private readonly http: HttpService) {}

  createCategory(
    category: CategoryInDTO,
  ): Observable<AxiosResponse<AxiosResponse>> {
    this.logger.log('Requesting to category graphql service!');
    const requestBody = {
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
}
