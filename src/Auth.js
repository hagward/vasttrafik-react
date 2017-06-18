import settings from './settings';

class Auth {
  constructor(url, key, secret, scope) {
    this.url = url;
    this.headers = {
      contentType: ['Content-Type', 'application/x-www-form-urlencoded'],
      auth: ['Authorization', 'Basic ' + btoa(key + ':' + secret)]
    };
    this.body = 'grant_type=client_credentials&scope=' + scope;
  }

  getToken() {
    return new Promise((resolve, reject) => {
      if (Date.now() < this.expireDate) {
        console.log('used cached token');
        resolve(this.token);
      } else {
        this.signIn(e => {
          const xhr = e.target;
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('SUCCESS!');

            const json = JSON.parse(xhr.response);
            this.token = json.access_token;
            this.expireDate = Date.now() + Number(json.expires_in) * 1000;

            resolve(this.token);
          }
        });
      }
    });
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

const auth = new Auth(settings.url, settings.key, settings.secret, '1');

export default auth;
