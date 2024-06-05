import { Redis } from 'ioredis';
import { env } from '~/util/env';

export const keydb = new Redis(env.KEYDB_URI, { lazyConnect: true });
