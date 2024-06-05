import process from 'node:process';
import { coerce, z } from 'zod';

const EnvSchema = z.object({
  PORT: coerce.number().default(4001),

  DATABASE_URI: z.string().min(1),
  KEYDB_URI: z.string().min(1),

  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

export const env = EnvSchema.parse(process.env);
