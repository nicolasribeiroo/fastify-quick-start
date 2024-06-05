import type { FastifyPluginOptions } from 'fastify';
import type { AppInstance } from '../app';
import { getCurrentUser } from '../methods/users';
import { AuthorizationMiddleware } from '../middleware';

export function usersRouter(app: AppInstance, _options: FastifyPluginOptions, next: () => void) {
  app.register(AuthorizationMiddleware);

  app.register(getCurrentUser);

  return next();
}
