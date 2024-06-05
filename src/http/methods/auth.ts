import { like } from 'drizzle-orm';
import { db } from '~/db';
import { users } from '~/db/schemas';
import { keydb } from '~/lib/keydb';
import { pika } from '~/lib/pika';
import type { AppInstance } from '../app';
import { conflict, ok } from '../response';

export async function registerUser(app: AppInstance) {
  return app.post(
    '/register',
    {
      schema: {
        body: {
          type: 'object',
          required: ['username', 'display_name'],
          properties: {
            username: { type: 'string', minLength: 3 },
            display_name: { type: 'string', minLength: 3 },
          },
        },
      },
    },
    async (request, reply) => {
      const { display_name, username } = request.body;

      const [exists] = await db.select().from(users).where(like(users.username, username));

      if (exists) return conflict('username_exists', 'That username is already taken.', reply);

      const id = pika.gen('user');
      const token = pika.gen('bearer');

      await keydb.hset(`tokens/${token}`, {
        user_id: id,
      });

      await db.insert(users).values({
        id,
        username,
        display_name,
      });

      return ok(
        {
          token,
        },
        reply,
      );
    },
  );
}
