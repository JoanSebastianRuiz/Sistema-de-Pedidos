import { relations } from 'drizzle-orm';
import { orders } from '../orders/orders.schema';
import { products } from '../products/products.schema';
import { orderDetails } from './order-details.schema';

export const orderDetailsRelations = relations(
  orderDetails,
  ({ one, many }) => ({
    order: one(orders, {
      fields: [orderDetails.orderId],
      references: [orders.id],
    }),
    product: one(products, {
      fields: [orderDetails.productId],
      references: [products.id],
    }),
  }),
);
