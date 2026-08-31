import { Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { AUTH_ERROR_CODES } from 'src/shared/errors';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(): Promise<void> {
    throw new ThrottlerException(AUTH_ERROR_CODES.TOO_MANY_REQUESTS);
  }
}
