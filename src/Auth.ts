interface Token {
  token: string;
  expiryDate: number;
}

export default class Auth {
  private key: string;
  private secret: string;
  private token: Token;
  private localStorage: Storage;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
    this.localStorage = window && window.localStorage ? window.localStorage : {} as any;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storedToken = this.getStoredToken();
      if (Date.now() < storedToken.expiryDate) {
        resolve(storedToken.token);
      } else {
        this.signIn()
          .then(response => response.json())
          .then(json => {
            this.token = {
              token: json.access_token,
              expiryDate: Date.now() + Number(json.expires_in) * 1000,
            };
            this.storeToken();

            resolve(this.token.token);
          });
      }
    });
  }

  getStoredToken(): Token {
    return {
      token: this.localStorage.getItem('token') as string,
      expiryDate: Number(this.localStorage.getItem('tokenExpiryDate')),
    };
  }

  signIn(): Promise<Response> {
    const headers = new Headers({
      'Authorization': 'Basic ' + btoa(this.key + ':' + this.secret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return fetch('https://api.vasttrafik.se:443/token', {
      method: 'POST',
      headers: headers,
      body: 'grant_type=client_credentials&scope=' + this.scope()
    });
  }

  scope(): string {
    let scope = this.localStorage.getItem('scope');
    if (!scope) {
      scope = this.generateScope();
      this.localStorage.setItem('scope', scope);
    }
    return scope;
  }

  generateScope(): string {
    return Math.random().toString(36).slice(2);
  }

  storeToken(): void {
    this.localStorage.setItem('token', this.token.token);
    this.localStorage.setItem('tokenExpiryDate', String(this.token.expiryDate));
  }
}
