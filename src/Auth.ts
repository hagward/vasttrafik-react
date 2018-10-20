interface IToken {
  expiryDate: number;
  token: string;
}

export default class Auth {
  private key: string;
  private secret: string;
  private token: IToken;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storedToken = this.getStoredToken();
      if (Date.now() < storedToken.expiryDate) {
        resolve(storedToken.token);
      } else {
        this.signIn()
          .then(response => response.json())
          .then(json => {
            this.token = {
              expiryDate: Date.now() + Number(json.expires_in) * 1000,
              token: json.access_token,
            };
            this.storeToken();

            resolve(this.token.token);
          });
      }
    });
  }

  private getStoredToken(): IToken {
    return {
      expiryDate: Number(localStorage.getItem('tokenExpiryDate')),
      token: localStorage.getItem('token') as string,
    };
  }

  private signIn(): Promise<Response> {
    const headers = new Headers({
      'Authorization': 'Basic ' + btoa(this.key + ':' + this.secret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return fetch('https://api.vasttrafik.se:443/token', {
      body: 'grant_type=client_credentials&scope=' + this.scope(),
      headers,
      method: 'POST',
    });
  }

  private scope(): string {
    let scope = localStorage.getItem('scope');
    if (!scope) {
      scope = this.generateScope();
      localStorage.setItem('scope', scope);
    }
    return scope;
  }

  private generateScope(): string {
    return Math.random().toString(36).slice(2);
  }

  private storeToken(): void {
    localStorage.setItem('token', this.token.token);
    localStorage.setItem('tokenExpiryDate', String(this.token.expiryDate));
  }
}
