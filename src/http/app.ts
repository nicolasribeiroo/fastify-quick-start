import fastifyCors from '@fastify/cors';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import fastify from 'fastify';
import { API_PREFIX } from '~/util/constants';
import { errorHandler } from './error-handler';
import { notFound } from './response';
import { APIRoutes, Routes } from './routes';

export type AppInstance = typeof app;

export const app = fastify().withTypeProvider<JsonSchemaToTsProvider<{ references: [] }>>();

app.register(fastifyCors, {
  allowedHeaders: ['content-type', 'authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
});

app.register(Routes);
app.register(APIRoutes, { prefix: API_PREFIX });

app.setErrorHandler(errorHandler);

app.setNotFoundHandler((_request, reply) => notFound('not_found', 'Route does not exist', reply));
