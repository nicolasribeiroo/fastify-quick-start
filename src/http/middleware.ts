import { eq } from 'drizzle-orm';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { db } from '~/db';
import { type User, users } from '~/db/schemas';
import { keydb } from '~/lib/keydb';
import type { Id } from '~/lib/pika';
import { unauthorized } from './response';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

const authorizationMiddlewareCallback: FastifyPluginAsync = async (app, options) => {
  app.addHook('preParsing', async (request, reply) => {
    const authorization = request.headers.authorization;

    if (!authorization) return unauthorized(reply);

    const token = (await keydb.hgetall(`tokens/${authorization}`)) as {
      user_id: Id<'user'>;
    };

    if (!token || Object.keys(token).length === 0) return unauthorized(reply);

    if (token.user_id) {
      const [user] = await db.select().from(users).where(eq(users.id, token.user_id));

      if (!user) return unauthorized(reply);

      request.user = user;
    }
  });
};

export const AuthorizationMiddleware = fp(authorizationMiddlewareCallback);
