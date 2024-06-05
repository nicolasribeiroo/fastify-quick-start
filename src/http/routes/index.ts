import type { FastifyPluginOptions } from 'fastify';
import type { AppInstance } from '../app';
import { authRouter } from './auth';
import { usersRouter } from './users';

export function APIRoutes(app: AppInstance, _options: FastifyPluginOptions, next: () => void) {
  app.register(authRouter, { prefix: '/auth' });
  app.register(usersRouter, { prefix: '/users' });

  return next();
}

export function Routes(app: AppInstance, _options: FastifyPluginOptions, next: () => void) {
  app.get('/health', async (_req, res) => {
    res.status(200).send('OK');
  });

  return next();
}
