import { readFile, writeFile } from 'fs/promises';
import { Addresses, Address, Args, CreateAddArgs } from './types';
import { GraphQLError } from 'graphql';
import path from 'path';

const ADDRESS_FILE = path.join(__dirname, '../../../data/addresses.json');

const readAddresses = async (): Promise<Addresses> => {
  const text = await readFile(ADDRESS_FILE, 'utf-8');
  return JSON.parse(text) as Addresses;
};

const writeAddresses = async (addresses: Addresses): Promise<void> => {
  await writeFile(ADDRESS_FILE, JSON.stringify(addresses, null, 2));
};

export const getAddress = async (_: any, args: Args, context: any): Promise<Address> => {
  context.logger.info('getAddress', 'Enter resolver');
  const addresses = await readAddresses();
  const address = addresses[args.username];
  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};

export const createAddress = async (_: any, args: CreateAddArgs, context: any): Promise<Address> => {
  context.logger.info('createAddress', 'Enter resolver');
  const addresses = await readAddresses();
  if (addresses[args.username]) {
    context.logger.error('createAddress', 'Address already exists');
    throw new GraphQLError('An address already exists');
  }
  addresses[args.username] = args.address;
  await writeAddresses(addresses);
  context.logger.info('createAddress', 'Address created');
  return args.address;
};