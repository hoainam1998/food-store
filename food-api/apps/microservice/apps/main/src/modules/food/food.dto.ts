import {
  MaxLength,
  IsPositive,
  IsString,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Exclude, Transform, Type } from 'class-transformer';
import { IsImageFile } from '@decorators/validate/is-image-file/is-image-file.decorator';

export class FoodDto {
  @IsOptional()
  @IsString({ message: 'Food ID must be string!' })
  food_id: string = Date.now().toString();

  @MaxLength(200, {
    message: 'Name must less then 200 characters!',
  })
  name: string;

  @IsPositive({ message: 'Price must greater than zero!' })
  @Type(() => Number)
  price: number;

  @Type(() => Number)
  @IsPositive({ message: 'Price for logged user must greater than zero!' })
  price_logged: number;

  @Type(() => Number)
  @IsPositive({ message: 'Price for employee must greater than zero!' })
  price_employee: number;

  @Type(() => Number)
  @IsPositive({ message: 'Discount must greater than zero!' })
  discount: number;

  @Type(() => Number)
  @IsPositive({ message: 'Amount must greater than zero!' })
  amount: number;

  @IsString({ message: 'Description must be string!' })
  description: string;

  @IsOptional()
  @IsImageFile(/image(jpg|png|jpeg)/)
  @Transform(
    ({ value }) =>
      `data:${value.mimetype};base64,${value.buffer.toString('base64')}`,
    { toClassOnly: true },
  )
  @IsString()
  avatar: any;

  @Exclude({ toClassOnly: true })
  @Type(() => String)
  @ValidateIf((o) => o.category_id !== undefined)
  @IsString({ message: 'Category ID must be string!' })
  category_id: string;
}
