import {
  boolean,
  numeric,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 120 }).notNull(),

  description: text('description'),

  price: numeric('price', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),

  isActive: boolean('is_active').default(true).notNull(),
});
