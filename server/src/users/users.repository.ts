import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/drizzle/client';
import { users } from 'src/database/drizzle/schema';
import { Role } from 'src/shared/domain/role.enum';

@Injectable()
export class UsersRepository {
  async findByEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findById(id: number) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async create(user: { name: string; email: string; passwordHash: string }) {
    const [createdUser] = await db
      .insert(users)
      .values({
        name: user.name,
        role: Role.CLIENT,
        email: user.email,
        passwordHash: user.passwordHash,
      })
      .returning();

    return createdUser;
  }
}
