import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/domain/role.enum';
import { db } from '../../client';
import { users } from '../../schema/users/users.schema';

export async function seedAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db
    .insert(users)
    .values({
      name: 'Admin',
      email,
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    })
    .onConflictDoNothing();
}
