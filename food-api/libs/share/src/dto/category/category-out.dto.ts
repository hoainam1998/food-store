import { CategoryDto } from './category';
import { Exclude } from 'class-transformer';

export class CategoryOutDTO extends CategoryDto {
  @Exclude()
  category_id: string;
  avatar: unknown;
  name: string;
}
