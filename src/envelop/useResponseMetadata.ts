import type { Plugin } from '@envelop/core';
import { ContextType } from '../types';

export const useResponseMetadata = (): Plugin<ContextType> => {
  return {
    onExecute() {
      return {
        onExecuteDone({ args, result, setResult }) {
          const requestId = args.contextValue.requestId;
          const withMetadata = { ...result, metadata: { requestId } };
          setResult(withMetadata);
        },
      };
    },
  };
};
