class Auth {
  constructor(key, secret, localStorage) {
    this.key = key;
    this.secret = secret;
    this.localStorage = localStorage;
  }

  getToken() {
    return new Promise((resolve, reject) => {
      const [token, expireDate] = this.getStoredToken();
      if (Date.now() < expireDate) {
        resolve(token);
      } else {
        this.signIn()
          .then(response => response.json())
          .then(json => {
            this.token = json.access_token;
            this.expireDate = Date.now() + Number(json.expires_in) * 1000;

            this.storeToken();

            resolve(this.token);
          });
      }
    });
  }

  getStoredToken() {
    return [this.localStorage.getItem('token'), this.localStorage.getItem('tokenExpireDate')];
  }

  signIn() {
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

  scope() {
    if (!this.localStorage.getItem('scope')) {
      this.localStorage.setItem('scope', this.generateScope());
    }
    return this.localStorage.getItem('scope');
  }

  generateScope() {
    return Math.random().toString(36).slice(2);
  }

  storeToken() {
    this.localStorage.setItem('token', this.token);
    this.localStorage.setItem('tokenExpireDate', this.expireDate);
  }
}

export default Auth;
