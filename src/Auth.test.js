import Auth from './Auth';
import LocalStorage from './LocalStorage';

describe('getToken', () => {
  let auth, localStorage;

  beforeEach(() => {
    localStorage = new LocalStorage();
    localStorage.setItem('token', 'storedToken');
    auth = new Auth('key', 'secret', localStorage);
    mockXhr();
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

function mockXhr() {
  const Xhr = function() {};
  Xhr.DONE = 5;
  Xhr.prototype.addEventListener = jest.fn()
    .mockImplementation((eventType, callback) => callback({
      target: {
        readyState: Xhr.DONE,
        status: 200,
        response: JSON.stringify({access_token: 'token', expires_in: 3600})
      }}));
  Xhr.prototype.open = jest.fn();
  Xhr.prototype.setRequestHeader = jest.fn();
  Xhr.prototype.send = jest.fn();
  window.XMLHttpRequest = Xhr;
}
