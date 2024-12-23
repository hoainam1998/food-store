import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class GraphqlQueryDTO {
  @IsArray()
  @Type(() => String)
  queries: string | string[];
}
