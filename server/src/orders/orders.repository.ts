import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { db } from 'src/database/drizzle/client';
import { orders } from 'src/database/drizzle/schema';
import { CurrentUserDto } from 'src/shared/domain/current-user.dto';
import { OrderState } from 'src/shared/domain/order-state.enum';
import { Role } from 'src/shared/domain/role.enum';
import { CreateOrderDto } from './dto/create-order.dto';

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
            orderDetails: true,
          },
        });

      case Role.CLIENT.toString():
        return await db.query.products.findMany({
          where: and(eq(orders.userId, currentUser.id)),
          with: {
            orderDetails: true,
          },
        });

      default:
        return [];
    }
  }

  async create(order: CreateOrderDto) {
    return await db.transaction(async (tx) => {
      const [existingRole] = await tx
        .select()
        .from(roles)
        .where(eq(roles.name, createRoleDto.name))
        .limit(1);

      if (existingRole) {
        throw new ConflictException({
          message: ROLE_ERROR_CODES.ROLE_ALREADY_EXISTS,
        });
      }

      if (createRoleDto.permissions.length > 0) {
        const existingPermissions = await tx
          .select({ id: permissions.id })
          .from(permissions)
          .where(inArray(permissions.id, createRoleDto.permissions));

        if (existingPermissions.length !== createRoleDto.permissions.length) {
          throw new NotFoundException({
            message: ROLE_ERROR_CODES.PERMISSION_NOT_FOUND,
          });
        }
      }

      const [role] = await tx
        .insert(roles)
        .values({
          name: createRoleDto.name,
          description: createRoleDto.description,
          initialRoute: createRoleDto.initialRoute,
          level: createRoleDto.level,
        })
        .returning(this.roleSelect);

      if (createRoleDto.permissions.length > 0) {
        await tx.insert(rolePermissions).values(
          createRoleDto.permissions.map((permissionId) => ({
            roleId: role.id,
            permissionId,
          })),
        );
      }

      return {
        ...role,
        permissions: createRoleDto.permissions,
      };
    });
  }

  async updateStatus(
    id: number,
    state: OrderState,
    currentUser: CurrentUserDto,
  ) {
    const conditions = [eq(orders.id, id)];
    if (currentUser.role !== Role.ADMIN) {
      conditions.push(eq(orders.userId, currentUser.id));
    }

    const [updatedOrder] = await db
      .update(orders)
      .set({ state })
      .where(and(...conditions))
      .returning();
    return updatedOrder;
  }
}
