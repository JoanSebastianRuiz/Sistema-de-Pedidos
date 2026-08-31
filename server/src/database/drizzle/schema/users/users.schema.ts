import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/domain/role.enum';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 120 }).notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  role: text('document_type', {
    enum: Object.values(Role) as [string, ...string[]],
  }).notNull(),

  passwordHash: text('password_hash').notNull(),
});
