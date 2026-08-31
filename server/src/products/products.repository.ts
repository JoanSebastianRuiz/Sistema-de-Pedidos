import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/drizzle/client';
import { products } from 'src/database/drizzle/schema';
import { Role } from 'src/shared/domain/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  async findByName(name: string) {
    return await db.query.products.findFirst({
      where: eq(products.name, name),
    });
  }

  async findById(id: number) {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
    });
  }

  async findAll(role: string) {
    switch (role) {
      case Role.ADMIN.toString():
        return await db.query.products.findMany();

      case Role.CLIENT.toString():
        return await db.query.products.findMany({
          where: eq(products.isActive, true),
        });

      default:
        return [];
    }
  }

  async create(product: CreateProductDto) {
    const [createdProduct] = await db
      .insert(products)
      .values({
        name: product.name,
        description: product.description,
        price: product.price,
      })
      .returning();
    return createdProduct;
  }

  async update(id: number, product: UpdateProductDto) {
    const [updatedProduct] = await db
      .update(products)
      .set({
        name: product.name,
        description: product.description,
        price: product.price,
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async updateStatus(id: number, isActive: boolean) {
    const [updatedProduct] = await db
      .update(products)
      .set({ isActive })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async remove(id: number) {
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return deletedProduct;
  }
}
