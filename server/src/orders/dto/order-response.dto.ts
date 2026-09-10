import { Expose } from 'class-transformer';
import { OrderDetailDto } from './order-detail.dto';
import { BasicResponseDto } from 'src/shared/domain/basic-response.dto';

export class OrderResponseDto {
  @Expose()
  id!: number;

  @Expose()
  status!: string;

  @Expose()
  date!: Date;

  @Expose()
  total!: number;

  @Expose()
  user?: BasicResponseDto;

  @Expose()
  orderDetails!: OrderDetailDto[];
}
