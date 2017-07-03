import LocalStorage from './LocalStorage';
import settings from './settings';

class Auth {
  constructor(url, key, secret) {
    this.url = url;
    this.headers = {
      contentType: ['Content-Type', 'application/x-www-form-urlencoded'],
      auth: ['Authorization', 'Basic ' + btoa(key + ':' + secret)]
    };
    this.body = 'grant_type=client_credentials&scope=' + this.generateScope();
  }

  generateScope() {
    return Math.random().toString(36).slice(2);
  }

  getToken() {
    return new Promise((resolve, reject) => {
      const [token, expireDate] = this.getLocalToken();
      if (Date.now() < expireDate) {
        console.log('used cached token');
        resolve(token);
      } else {
        this.signIn(e => {
          const xhr = e.target;
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('SUCCESS!');

            const json = JSON.parse(xhr.response);
            this.token = json.access_token;
            this.expireDate = Date.now() + Number(json.expires_in) * 1000;

            this.storeToken();

            resolve(this.token);
          }
        });
      }
    });
  }

  getLocalToken() {
    return this.token ?
      [this.token, this.expireDate] :
      [LocalStorage.getItem('token'), LocalStorage.getItem('tokenExpireDate')];
  }

  storeToken() {
    LocalStorage.setItem('token', this.token);
    LocalStorage.setItem('tokenExpireDate', this.expireDate);
  }

  signIn(onSignedIn) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', onSignedIn);

    xhr.open('POST', this.url);
    xhr.setRequestHeader(...this.headers.contentType);
    xhr.setRequestHeader(...this.headers.auth);
    xhr.send(this.body);
  }
}

export default new Auth(settings.url, settings.key, settings.secret);
