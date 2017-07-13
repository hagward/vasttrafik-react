import Auth from './Auth';

describe('getToken', () => {
  let auth;

  beforeEach(() => {
    window.localStorage = {token: 'storedToken'};
    window.fetch = mockFetch();

    auth = new Auth('key', 'secret');
  });

  it('returns stored token if valid', () => {
    localStorage['tokenExpireDate'] = Date.now() + 100000;

    return expect(auth.getToken()).resolves.toEqual('storedToken');
  });

  it('fetches token asynchronously if stored token not valid', () => {
    localStorage['tokenExpireDate'] = Date.now() - 100000;

    return expect(auth.getToken()).resolves.toEqual('token');
  });
});

function mockFetch() {
  return (url, init) => {
    return new Promise(resolve => resolve({
      json: () => new Promise(resolveInner =>
        resolveInner({access_token: 'token', expires_in: 3600}))
    }));
  };
}
