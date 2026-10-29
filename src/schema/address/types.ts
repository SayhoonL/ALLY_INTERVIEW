export type Address = {
  state : string;
  street: string;
  city: string;
  zipcode: string;
};

export type Addresses = {
  [key: string]: Address;
};

export type Args = {
  username: string;
};

export type AddressInput = {
  state: string;
  street: string;
  city: string;
  zipcode: string;
};

export type CreateAddArgs = {
  username: string;
  address: AddressInput;
};