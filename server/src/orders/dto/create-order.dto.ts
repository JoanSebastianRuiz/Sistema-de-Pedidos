import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ORDER_ERROR_CODES } from 'src/shared/errors';
import { OrderDetailDto } from './order-detail.dto';

export class CreateOrderDto {
  @IsArray({
    message: ORDER_ERROR_CODES.ORDER_DETAILS_INVALID,
  })
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetails!: OrderDetailDto[];
}
