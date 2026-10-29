import { getAddress, createAddress } from "./address/address";
import { Address, Args, CreateAddArgs } from "./address/types";

export const resolvers = {
  Query: {
    address: (parent: any, args: Args, context: any, info: any): Promise<Address> => {
      return getAddress(parent, args, context);
    },
  },
  Mutation: {
    createAddress: (parent: any, args: CreateAddArgs, context: any, info: any): Promise<Address> => {
      return createAddress(parent, args, context);
    },
  },
};