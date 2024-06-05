import { Pika } from 'pika-id';

export const pika = new Pika([
  'user',
  {
    prefix: 'bearer',
    secure: true,
  },
]);

type PikaIDs = (typeof pika.prefixes)[number]['prefix'];
export type Id<Prefix extends PikaIDs> = `${Prefix}_${string}`;
