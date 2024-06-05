import type { Config } from 'drizzle-kit';
import { env } from './src/util/env';

export default {
  schema: './src/db/schemas.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URI,
  },
  migrations: {
    schema: 'public',
  },
} satisfies Config;
