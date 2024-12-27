import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { GraphqlQueryDTO } from './graphql-query.dto';

export class PaginationDTO extends GraphqlQueryDTO {
  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNumber({ allowNaN: false }, { message: 'Page size must be a number!' })
  pageSize: number;

  @Type(() => Number)
  @Transform(({ value }) => +value)
  @IsNumber({ allowNaN: false }, { message: 'Page number must be a number!' })
  pageNumber: number;
}
