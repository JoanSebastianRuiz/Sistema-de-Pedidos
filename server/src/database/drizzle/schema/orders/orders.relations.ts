import { relations } from 'drizzle-orm';
import { orderDetails } from '../orderDetails/order-details.schema';
import { users } from '../users/users.schema';
import { orders } from './orders.schema';

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderDetails: many(orderDetails),
}));
