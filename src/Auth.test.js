import Auth from './Auth';
import LocalStorage from './LocalStorage';

describe('getToken', () => {
  let auth, localStorage;

  beforeEach(() => {
    localStorage = new LocalStorage();
    localStorage.setItem('token', 'storedToken');
    auth = new Auth('key', 'secret', localStorage);
    window.fetch = mockFetch();
  });

  it('returns stored token if valid', () => {
    localStorage.setItem('tokenExpireDate', Date.now() + 100000);

    return expect(auth.getToken()).resolves.toEqual('storedToken');
  });

  it('fetches token asynchronously if stored token not valid', () => {
    localStorage.setItem('tokenExpireDate', Date.now() - 100000);

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
