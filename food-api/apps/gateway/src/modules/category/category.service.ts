import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CATEGORY_MICROSERVICE } from './category.di-token';
import { Observable } from 'rxjs';
import { IResponse } from '@share';
import { CategoryDto } from '@share/dto/category.dto';
import { CREATE_CATEGORY } from '@share/patterns/category.pattern';
import { LoggerService } from '@share/logger/logger.service';

@Injectable()
export class CategoryService {
  private readonly logger = new LoggerService(CategoryService.name);

  constructor(
    @Inject(CATEGORY_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  create(category: CategoryDto): Observable<IResponse> {
    try {
      this.logger.log('Send message to category microservice');
      return this.client.send({ cmd: CREATE_CATEGORY }, category);
    } catch (err) {
      this.logger.error(
        `Send message to category microservice failed with: ${err.message}`,
      );
      throw err;
    }
  }
}
