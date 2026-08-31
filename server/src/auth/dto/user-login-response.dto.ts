import { Expose } from 'class-transformer';

export class UserLoginResponseDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  role!: string;
}
