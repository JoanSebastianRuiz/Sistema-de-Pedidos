import { integer, numeric, pgTable, serial } from 'drizzle-orm/pg-core';

import { orders } from '../orders/orders.schema';
import { products } from '../products/products.schema';

export const orderDetails = pgTable('order_details', {
  id: serial('id').primaryKey(),

  orderId: integer('order_id').references(() => orders.id),

  productId: integer('product_id').references(() => products.id),

  quantity: integer('quantity').notNull(),

  unitPrice: numeric('unit_price', {
    precision: 12,
    scale: 2,
    mode: 'number',
  }).notNull(),

  subtotal: numeric('subtotal', {
    precision: 12,
    scale: 2,
    mode: 'number',
  }).notNull(),
});
