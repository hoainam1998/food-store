import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { IResponse } from '@share';
import { HttpService } from '@nestjs/axios';
import { CategoryDto } from '@share/dto/category.dto';
import { catchError, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);

  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly http: HttpService,
  ) {}

  create(category: CategoryDto): Observable<IResponse> {
    this.logger.log('Handle income data with database');

    return this.http.post<IResponse>('create-category', category).pipe(
      map((response: AxiosResponse) => response.data),
      catchError(async (err) => console.log(err)),
    );
  }
}
