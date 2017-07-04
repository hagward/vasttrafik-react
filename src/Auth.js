class Auth {
  constructor(key, secret, localStorage) {
    this.localStorage = localStorage;

    this.url = 'https://api.vasttrafik.se:443/token';
    this.headers = {
      contentType: ['Content-Type', 'application/x-www-form-urlencoded'],
      auth: ['Authorization', 'Basic ' + btoa(key + ':' + secret)]
    };
    this.body = 'grant_type=client_credentials&scope=' + this.scope();
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

  getToken() {
    return new Promise((resolve, reject) => {
      const [token, expireDate] = this.getStoredToken();
      if (Date.now() < expireDate) {
        console.log('used cached token');
        resolve(token);
      } else {
        this.signIn(e => this.onSignedIn(e.target, resolve, reject));
      }
    });
  }

  onSignedIn(xhr, resolve, reject) {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log('SUCCESS!');

      const json = JSON.parse(xhr.response);
      this.token = json.access_token;
      this.expireDate = Date.now() + Number(json.expires_in) * 1000;

      this.storeToken();

      resolve(this.token);
    }
  }

  getStoredToken() {
    return [this.localStorage.getItem('token'), this.localStorage.getItem('tokenExpireDate')];
  }

  storeToken() {
    this.localStorage.setItem('token', this.token);
    this.localStorage.setItem('tokenExpireDate', this.expireDate);
  }

  signIn(onLoad) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', onLoad);

    xhr.open('POST', this.url);
    xhr.setRequestHeader(...this.headers.contentType);
    xhr.setRequestHeader(...this.headers.auth);
    xhr.send(this.body);
  }
}

export default Auth;
