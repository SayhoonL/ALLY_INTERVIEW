import { Logger } from '../logger';

export type ContextType = {
  request: Request;
  client: string | null;
  requestId: string;
  logger: Logger;
};
