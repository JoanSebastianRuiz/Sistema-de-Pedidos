import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PRODUCT_ERROR_CODES } from 'src/shared/errors';

export class CreateProductDto {
  @IsString({ message: PRODUCT_ERROR_CODES.NAME_INVALID })
  @MaxLength(120, { message: PRODUCT_ERROR_CODES.NAME_TOO_LONG })
  name!: string;

  @IsOptional()
  @IsString({ message: PRODUCT_ERROR_CODES.DESCRIPTION_INVALID })
  description?: string;

  @IsNumber({}, { message: PRODUCT_ERROR_CODES.PRICE_INVALID })
  @Min(0, { message: PRODUCT_ERROR_CODES.PRICE_INVALID })
  price!: number;
}
