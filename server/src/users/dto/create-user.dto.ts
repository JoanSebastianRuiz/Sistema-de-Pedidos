import { IsEmail, IsString, MaxLength } from 'class-validator';
import { IsStrongPassword } from 'src/shared/decorators/is-strong-password.decorator';

import { USER_ERROR_CODES } from 'src/shared/errors';

export class CreateUserDto {
  @IsString({ message: USER_ERROR_CODES.NAME_INVALID })
  @MaxLength(120, { message: USER_ERROR_CODES.NAME_TOO_LONG })
  name!: string;

  @IsEmail({}, { message: USER_ERROR_CODES.INVALID_EMAIL })
  @MaxLength(255, { message: USER_ERROR_CODES.EMAIL_TOO_LONG })
  email!: string;

  @IsStrongPassword()
  password!: string;
}
