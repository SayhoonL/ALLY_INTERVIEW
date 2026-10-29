import { getAddress, createAddress } from "./address/address";
import { Address, Args, CreateAddArgs } from "./address/types";
import { getNearEarthObjects } from "./neo/neo";
import { NearEarthObjectFeed, NeoArgs } from "./neo/types";

export const resolvers = {
  Query: {
    address: (parent: any, args: Args, context: any, info: any): Promise<Address> => {
      return getAddress(parent, args, context);
    },
    nearEarthObjects: (parent: any, args: NeoArgs, context: any, info: any): Promise<NearEarthObjectFeed | null> => {
      return getNearEarthObjects(parent, args, context);
    },
  },
  Mutation: {
    createAddress: (parent: any, args: CreateAddArgs, context: any, info: any): Promise<Address> => {
      return createAddress(parent, args, context);
    },
  },
};