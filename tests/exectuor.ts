import { createYoga } from 'graphql-yoga';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { genSchema } from '../src/schema';
import plugins from '../src/envelop/index';

console.profile = jest.fn();
const schema = genSchema();

const yoga = createYoga({ schema, plugins });

export const createExecutor = (headers: Record<string, string>) =>
  buildHTTPExecutor({
    fetch: yoga.fetch,
    headers,
  });

export const executor = createExecutor({ client: 'test' });
