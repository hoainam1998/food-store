import { IsImageFile } from '@decorators/validate/is-image-file/is-image-file.decorator';
import { MaxLength, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryDto {
  @IsOptional()
  @IsString({ message: 'Category ID must be string!' })
  category_id: string = Date.now().toString();

  @IsOptional()
  @IsImageFile(/image(jpg|png|jpeg)/)
  @Transform(
    ({ value }) =>
      `data:${value.mimetype};base64,${value.buffer.toString('base64')}`,
    { toClassOnly: true },
  )
  @IsString({ message: 'Avatar must be string!' })
  avatar: any;

  @MaxLength(200, {
    message: 'Name must less then 200 characters!',
  })
  name: string;
}
