import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CategoryDto } from './category';
import { IsImageFile } from '@share/decorators/validate/is-image-file/is-image-file.decorator';
import { Transform } from 'class-transformer';

export class CategoryInDTO extends CategoryDto {
  @IsOptional()
  @IsString({ message: 'Category ID must be string!' })
  category_id: string = Date.now().toString();

  @IsImageFile(/image(jpg|png|jpeg)/, {
    message: 'File must be image!',
  })
  @Transform(
    ({ value }) =>
      `data:${value.mimetype};base64,${value.buffer.toString('base64')}`,
    { toClassOnly: true },
  )
  avatar: string;

  @MaxLength(200, {
    message: 'Name must less then 200 characters!',
  })
  name: string;
}
