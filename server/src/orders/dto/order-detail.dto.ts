import { IsInt, Min } from 'class-validator';
import { ORDER_ERROR_CODES } from 'src/shared/errors';

export class OrderDetailDto {
  @IsInt({
    message: ORDER_ERROR_CODES.PRODUCT_INVALID,
  })
  productId!: number;

  @IsInt({
    message: ORDER_ERROR_CODES.QUANTITY_INVALID,
  })
  @Min(1, {
    message: ORDER_ERROR_CODES.QUANTITY_INVALID,
  })
  quantity!: number;
}
