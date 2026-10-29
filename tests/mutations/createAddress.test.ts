import { parse } from 'graphql';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { executor } from '../exectuor';

const ADDRESS_FILE = path.join(__dirname, '../../data/addresses.json');

const mutation = `
  mutation CreateAddress($username: String!, $address: AddressInput!) {
    createAddress(username: $username, address: $address) {
      state
      street
      city
      zipcode
    }
  }
`;

const newAddress = {
  state: 'CA',
  street: '1 Main St',
  city: 'Los Angeles',
  zipcode: '90001',
};

describe('createAddress', () => {
  let originalFile: string;

  beforeAll(async () => {
    originalFile = await readFile(ADDRESS_FILE, 'utf-8');
  });

  afterAll(async () => {
    await writeFile(ADDRESS_FILE, originalFile);
  });

  test('Success', async () => {
    const result = await executor({
      document: parse(mutation),
      variables: { username: 'bob', address: newAddress },
    });

    expect(result).toEqual({
      data: { createAddress: newAddress },
      metadata: { requestId: expect.any(String) },
    });
  });

  test('Error: address already exists', async () => {
    const result = await executor({
      document: parse(mutation),
      variables: { username: 'jack', address: newAddress },
    });

    expect(result).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ message: 'An address already exists' }),
        ]),
      }),
    );
  });
});