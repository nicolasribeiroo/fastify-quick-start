import type { FastifyInstance } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';
import { logger } from '~/util/logger';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  if (error.validation) {
    const code = getReasonPhrase(error.statusCode ?? 500);

    return reply.status(error.statusCode ?? 500).send({
      success: false,
      error: {
        code: code.toLowerCase().replace(/ /g, '_'),
        message: error.message,
      },
    });
  }

  logger.error(error);

  return reply.status(500).send({
    success: false,
    error: {
      code: 'internal_server_error',
      message:
        "We're sorry, but something went wrong. We've been notified about this issue and will take a look at it shortly.",
    },
  });
};
