import { IsOptional } from 'class-validator';
import { CategoryDto } from './category';
import { Exclude } from 'class-transformer';

export class CategoryOutDTO extends CategoryDto {
  @Exclude()
  category_id: string;

  @IsOptional()
  avatar: unknown;

  @IsOptional()
  name: string;
}
