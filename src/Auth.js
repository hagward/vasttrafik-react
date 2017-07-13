class Auth {
  constructor(key, secret) {
    this.key = key;
    this.secret = secret;
    this.localStorage = window && window.localStorage ? window.localStorage : {};
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
    return [this.localStorage['token'], this.localStorage['tokenExpireDate']];
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
    if (!this.localStorage['scope']) {
      this.localStorage['scope'] = this.generateScope();
    }
    return this.localStorage['scope'];
  }

  generateScope() {
    return Math.random().toString(36).slice(2);
  }

  storeToken() {
    this.localStorage['token'] = this.token;
    this.localStorage['tokenExpireDate'] = this.expireDate;
  }
}

export default Auth;
