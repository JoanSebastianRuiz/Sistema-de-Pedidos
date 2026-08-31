import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const userId = req.session?.user?.id;

    if (userId) {
      req.log = req.log.child({ userId });
    }

    next();
  }
}
