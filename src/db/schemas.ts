import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { type Id, pika } from '~/lib/pika';

export type User = InferSelectModel<typeof users>;

export const users = pgTable(
  'users',
  {
    id: text('id')
      .$type<Id<'user'>>()
      .primaryKey()
      .$defaultFn(() => pika.gen('user')),
    display_name: text('display_name').notNull(),
    username: text('username').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
  },
  table => {
    return {
      usernameUnique: uniqueIndex().on(table.username),
    };
  },
);
