import { IsString } from 'class-validator';
import { USER_ERROR_CODES } from 'src/shared/errors';

export class LoginDto {
  @IsString({ message: USER_ERROR_CODES.INVALID_EMAIL })
  email!: string;

  @IsString({ message: USER_ERROR_CODES.INVALID_PASSWORD })
  password!: string;
}
