import type { User } from '../database/drizzle/schema/users/users.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
