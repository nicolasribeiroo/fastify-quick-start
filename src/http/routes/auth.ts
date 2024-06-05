import type { FastifyPluginOptions } from 'fastify';
import type { AppInstance } from '../app';
import { registerUser } from '../methods/auth';

export function authRouter(app: AppInstance, _options: FastifyPluginOptions, next: () => void) {
  app.register(registerUser);

  return next();
}
