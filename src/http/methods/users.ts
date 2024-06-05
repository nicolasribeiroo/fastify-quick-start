import type { AppInstance } from '../app';
import { ok } from '../response';

export async function getCurrentUser(app: AppInstance) {
  return app.get('/@me', async (request, reply) => {
    return ok({ user: request.user }, reply);
  });
}
