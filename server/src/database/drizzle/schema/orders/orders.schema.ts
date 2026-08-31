import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { OrderState } from 'src/shared/domain/order-state.enum';
import { users } from '../users/users.schema';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),

  userId: integer('user_id').references(() => users.id),

  state: text('state', {
    enum: Object.values(OrderState) as [string, ...string[]],
  }).notNull(),

  date: timestamp('date').defaultNow().notNull(),

  total: numeric('total', {
    precision: 12,
    scale: 2,
    mode: 'number',
  }).notNull(),
});
