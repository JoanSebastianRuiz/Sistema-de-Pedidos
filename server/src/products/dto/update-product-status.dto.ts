import { IsBoolean } from 'class-validator';
import { PRODUCT_ERROR_CODES } from 'src/shared/errors';

export class UpdateProductStatusDto {
  @IsBoolean({ message: PRODUCT_ERROR_CODES.STATUS_INVALID })
  isActive!: boolean;
}
