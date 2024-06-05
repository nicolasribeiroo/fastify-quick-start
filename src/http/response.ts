import type { FastifyReply } from 'fastify';

export function ok<T = unknown>(data: T, reply: FastifyReply): FastifyReply {
  return reply.status(200).send({ success: true, data });
}

export function conflict(code: string, message: string, reply: FastifyReply): FastifyReply {
  return reply.status(409).send({
    success: false,
    error: {
      code,
      message,
    },
  });
}

export function notFound(code: string, message: string, reply: FastifyReply): FastifyReply {
  return reply.status(404).send({
    success: false,
    error: {
      code,
      message,
    },
  });
}

export function unauthorized(reply: FastifyReply): FastifyReply {
  return reply
    .status(401)
    .send({ success: false, error: { code: 'invalid_auth', message: 'You are not authorized!' } });
}
