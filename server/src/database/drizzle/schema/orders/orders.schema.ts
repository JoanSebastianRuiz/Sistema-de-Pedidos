import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { OrderStatus } from 'src/shared/domain/order-status.enum';
import { users } from '../users/users.schema';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),

  userId: integer('user_id').references(() => users.id),

  status: text('status', {
    enum: Object.values(OrderStatus) as [string, ...string[]],
  }).notNull(),

  date: timestamp('date').defaultNow().notNull(),

  total: numeric('total', {
    precision: 12,
    scale: 2,
    mode: 'number',
  }).notNull(),
});
