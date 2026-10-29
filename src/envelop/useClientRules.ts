import type { Plugin } from '@envelop/core';
import { GraphQLError, getOperationAST } from 'graphql';
import { ContextType } from '../types';

export const useClientRules = (): Plugin<ContextType> => {
  return {
    onExecute({ args, setResultAndStopExecution }) {
      const { client, logger } = args.contextValue;
      if (!client) {
        logger.error('Missing required header: client');
        setResultAndStopExecution({ errors: [new GraphQLError('Missing required header: client')] });
        return;
      }
      const operation = getOperationAST(args.document, args.operationName);
      if (client === 'strata' && operation?.operation === 'mutation') {
        logger.error('Mutations are not allowed for client strata');
        setResultAndStopExecution({ errors: [new GraphQLError('Mutations are not allowed for this client')] });
      }
    },
  };
};