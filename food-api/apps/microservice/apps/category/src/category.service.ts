import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { IResponse } from '@share';
import { HttpService } from '@nestjs/axios';
import { CategoryDto } from '@share/dto/category.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LoggerService } from '@share/logger/logger.service';

@Injectable()
export class CategoryService {
  private readonly logger = new LoggerService(CategoryService.name);

  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly http: HttpService,
  ) {}

  create(category: CategoryDto): Observable<AxiosResponse<IResponse>> {
    this.logger.log('Handle income data with database');
    return this.http.post<IResponse>('create-category', category);
  }
}
