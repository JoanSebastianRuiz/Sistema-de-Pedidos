import { applyDecorators } from '@nestjs/common';
import { IsString, Matches, MinLength } from 'class-validator';
import { USER_ERROR_CODES } from '../errors';

export function IsStrongPassword() {
  return applyDecorators(
    IsString(),
    MinLength(8, {
      message: USER_ERROR_CODES.PASSWORD_TOO_SHORT,
    }),
    Matches(/[a-z]/, {
      message: USER_ERROR_CODES.PASSWORD_LOWERCASE_REQUIRED,
    }),
    Matches(/[A-Z]/, {
      message: USER_ERROR_CODES.PASSWORD_UPPERCASE_REQUIRED,
    }),
    Matches(/\d/, {
      message: USER_ERROR_CODES.PASSWORD_NUMBER_REQUIRED,
    }),
    Matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: USER_ERROR_CODES.PASSWORD_SPECIAL_CHAR_REQUIRED,
    }),
  );
}
