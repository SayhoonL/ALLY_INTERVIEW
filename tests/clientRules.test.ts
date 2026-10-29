import { parse } from 'graphql';
import { createExecutor } from './exectuor';

const query = `
  query GetAddress($username: String!) {
    address(username: $username) {
      city
    }
  }
`;

const mutation = `
  mutation CreateAddress($username: String!, $address: AddressInput!) {
    createAddress(username: $username, address: $address) {
      city
    }
  }
`;

const address = { state: 'CA', street: '1 Main St', city: 'Los Angeles', zipcode: '90001' };

describe('client rules', () => {
  test('Rejects a request with no client header', async () => {
    const result = await createExecutor({})({
      document: parse(query),
      variables: { username: 'jack' },
    });

    expect(result).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ message: 'Missing required header: client' }),
        ]),
      }),
    );
  });

  test('Allows queries for strata', async () => {
    const result = await createExecutor({ client: 'strata' })({
      document: parse(query),
      variables: { username: 'jack' },
    });

    expect(result).toEqual({
      data: { address: { city: 'Sometown' } },
      metadata: { requestId: expect.any(String) },
    });
  });

  test('Rejects mutations for strata', async () => {
    const result = await createExecutor({ client: 'strata' })({
      document: parse(mutation),
      variables: { username: 'strataUser', address },
    });

    expect(result).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ message: 'Mutations are not allowed for this client' }),
        ]),
      }),
    );
  });
});