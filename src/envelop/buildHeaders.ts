import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onExecute({ args, extendContext }) {
      const requestId = uuid();
      const client = args.contextValue.request.headers.get('client');
      extendContext({ requestId: requestId, client: client });
    },
  };
};
