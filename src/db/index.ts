import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { env } from '~/util/env';
import { logger } from '~/util/logger';
import * as schema from './schemas';

export let db: ReturnType<typeof drizzle<typeof schema>>;

export async function setupDB() {
  const pool = await new pg.Pool({
    connectionString: env.DATABASE_URI,
  })
    .connect()
    .then(client => {
      logger.info('connected to database');
      return client;
    })
    .catch(err => {
      logger.error('failed to connect to database %s', err);
      process.exit(1);
    });

  db = drizzle(pool, { schema, logger: env.NODE_ENV !== 'production' });

  await migrate(db, {
    migrationsFolder: './src/db/migrations',
  })
    .then(() => {
      logger.info('migrations ran successfully');
    })
    .catch(err => {
      logger.error('migrations failed to run %s', err);
      process.exit(1);
    });
}
