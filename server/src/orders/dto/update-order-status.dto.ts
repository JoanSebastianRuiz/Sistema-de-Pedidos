import { IsEnum } from 'class-validator';

import { OrderStatus } from 'src/shared/domain/order-status.enum';
import { ORDER_ERROR_CODES } from 'src/shared/errors';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: ORDER_ERROR_CODES.INVALID_ORDER_STATUS,
  })
  status!: OrderStatus;
}
