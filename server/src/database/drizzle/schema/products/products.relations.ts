import { relations } from 'drizzle-orm';
import { orderDetails } from '../orderDetails/order-details.schema';
import { products } from './products.schema';

export const productsRelations = relations(products, ({ many }) => ({
  orderDetails: many(orderDetails),
}));
