import { pgTable, serial, text, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 256 }).primaryKey(), // Firebase UID
  fullName: text('full_name'),
  email: varchar('email', { length: 256 }),
});

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name'),
  userId: varchar('user_id', { length: 256 }).references(() => users.id), // References Firebase UID
});

export const estimates = pgTable('estimates', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  laborCost: integer('labor_cost'),
  materialsTotal: integer('materials_total'),
  totalCost: integer('total_cost'),
  status: text('status').default('initiated'),
  clientId: integer('client_id').references(() => clients.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const materials = pgTable('materials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: integer('unit_price').notNull(),
  estimateId: integer('estimate_id').references(() => estimates.id).notNull(),
});