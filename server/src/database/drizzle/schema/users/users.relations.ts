import { relations } from 'drizzle-orm';
import { orders } from '../orders/orders.schema';
import { users } from './users.schema';

export const usersRelations = relations(users, ({ one, many }) => ({
  orders: many(orders),
}));
