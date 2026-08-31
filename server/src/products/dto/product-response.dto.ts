import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description?: string;

  @Expose()
  price!: number;

  @Expose()
  isActive!: boolean;
}
