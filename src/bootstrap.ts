import { setupDB } from './db';
import { app } from './http/app';
import { keydb } from './lib/keydb';
import { env } from './util/env';
import { logger } from './util/logger';

async function bootstrap() {
  await keydb.connect(() => logger.info('connection to keydb established'));
  await setupDB();

  return app.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
    logger.info(`server listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch(err => {
  logger.error(err);
  process.exit(1);
});
