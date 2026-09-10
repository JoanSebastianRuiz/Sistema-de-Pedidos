import { ConflictException, Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from 'src/database/drizzle/client';
import { orderDetails, orders, products } from 'src/database/drizzle/schema';
import { CurrentUserDto } from 'src/shared/domain/current-user.dto';
import { OrderStatus } from 'src/shared/domain/order-status.enum';
import { Role } from 'src/shared/domain/role.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_ERROR_CODES } from 'src/shared/errors';
import _ from 'lodash';

@Injectable()
export class OrdersRepository {
  async findById(id: number, currentUser: CurrentUserDto) {
    const conditions = [eq(orders.id, id)];
    if (currentUser.role !== Role.ADMIN) {
      conditions.push(eq(orders.userId, currentUser.id));
    }
    return await db.query.orders.findFirst({
      where: and(...conditions),
    });
  }

  async findAll(currentUser: CurrentUserDto) {
    switch (currentUser.role) {
      case Role.ADMIN.toString():
        return await db.query.orders.findMany({
          with: {
            user: true,
            orderDetails: {
              with: {
                product: true,
              },
            },
          },
        });

      case Role.CLIENT.toString():
        return await db.query.orders.findMany({
          where: and(eq(orders.userId, currentUser.id)),
          with: {
            orderDetails: {
              with: {
                product: true,
              },
            },
          },
        });

      default:
        return [];
    }
  }

  async create(order: CreateOrderDto, currentUser: CurrentUserDto) {
    return await db.transaction(async (tx) => {
      const productIds = order.orderDetails.map((detail) => detail.productId);
      const existingProducts = await tx
        .select({
          id: products.id,
          price: products.price,
        })
        .from(products)
        .where(inArray(products.id, productIds));

      if (existingProducts.length !== productIds.length) {
        throw new ConflictException({
          message: ORDER_ERROR_CODES.SOME_PRODUCTS_NOT_FOUND,
        });
      }

      const existingProductsById = _.keyBy(existingProducts, 'id');

      const orderTotal = order.orderDetails.reduce((acc, detail) => {
        const product = existingProductsById[detail.productId];
        return acc + product.price * detail.quantity;
      }, 0);

      const [createdOrder] = await tx
        .insert(orders)
        .values({
          userId: currentUser.id,
          status: OrderStatus.PENDING,
          total: orderTotal,
        })
        .returning();

      if (!createdOrder) {
        throw new ConflictException({
          message: ORDER_ERROR_CODES.ORDER_DETAILS_INVALID,
        });
      }

      const orderDetailsToInsert = order.orderDetails.map((detail) => {
        const product = existingProductsById[detail.productId];
        const subtotal = product.price * detail.quantity;
        return {
          ...detail,
          orderId: createdOrder.id,
          unitPrice: product.price,
          subtotal,
        };
      });

      const insertedOrderDetails = await tx
        .insert(orderDetails)
        .values(orderDetailsToInsert)
        .returning();

      if (insertedOrderDetails.length !== orderDetailsToInsert.length) {
        throw new ConflictException({
          message: ORDER_ERROR_CODES.ORDER_DETAILS_INVALID,
        });
      }

      return {
        ...createdOrder,
        orderDetails: orderDetailsToInsert,
      };
    });
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
    currentUser: CurrentUserDto,
  ) {
    const conditions = [eq(orders.id, id)];
    if (currentUser.role !== Role.ADMIN) {
      conditions.push(eq(orders.userId, currentUser.id));
    }

    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(and(...conditions))
      .returning();
    return updatedOrder;
  }
}
