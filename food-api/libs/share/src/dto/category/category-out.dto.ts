import { IsOptional } from 'class-validator';
import { CategoryDto } from './category';
import { Exclude, Expose, Transform } from 'class-transformer';

export class CategoryOutDTO extends CategoryDto {
  @Exclude({ toClassOnly: true })
  category_id: string;

  @Expose()
  @Transform(({ obj }) => obj.category_id)
  categoryId?: string;

  @IsOptional()
  avatar: unknown;

  @IsOptional()
  name: string;
}
