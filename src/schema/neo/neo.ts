import { GraphQLError } from 'graphql';
import { getMeshSDK } from '../../../.mesh';
import { toNearEarthObjectFeed } from './mapper';
import { NearEarthObjectFeed, NeoArgs } from './types';

export const getNearEarthObjects = async (_: any, args: NeoArgs, context: any): Promise<NearEarthObjectFeed | null> => {
  context.logger.info('Enter resolver', { resolver: 'getNearEarthObjects' });
  let result;
  try {
    result = await getMeshSDK().NeoFeed({ startDate: args.startDate, endDate: args.endDate });
  } catch (err) {
    context.logger.error('NASA NEO request failed', { resolver: 'getNearEarthObjects', error: String(err) });
    throw new GraphQLError('Unable to fetch near earth objects');
  }
  if (!result.neoFeed) {
    context.logger.error('No NEO feed returned', { resolver: 'getNearEarthObjects' });
    return null;
  }
  context.logger.info('Returning NEO feed', { resolver: 'getNearEarthObjects' });
  return toNearEarthObjectFeed(result.neoFeed);
};