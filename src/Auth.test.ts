import Auth from "./Auth";

describe("getToken", () => {
  let auth: Auth;

  beforeEach(() => {
    localStorage.setItem("token", "storedToken");
    (fetch as any) = mockFetch();

    auth = new Auth("key", "secret");
  });

  it("returns stored token if valid", () => {
    localStorage.setItem("tokenExpiryDate", String(Date.now() + 100000));

    return expect(auth.getToken()).resolves.toEqual("storedToken");
  });

  it("fetches token asynchronously if stored token not valid", () => {
    localStorage.setItem("tokenExpiryDate", String(Date.now() - 100000));

    return expect(auth.getToken()).resolves.toEqual("token");
  });
});

function mockFetch() {
  return (url: string, init: any) => {
    return new Promise(resolve =>
      resolve({
        json: () =>
          new Promise(resolveInner =>
            resolveInner({ access_token: "token", expires_in: 3600 })
          )
      })
    );
  };
}
