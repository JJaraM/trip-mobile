import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  static get parameters() {
    return [[Http]];
  }

  constructor (http) {
    this.http = http;
  }

  signIn(email, password) {
    return this.http.get('http://localhost:8083/trip/api/user/signIn?email='+email+"&password="+password)
    .map(data => data.json())
    .catch(this.handleError);
  }

  signUp(email, name, password) {
    return this.http.get('http://localhost:8083/trip/api/user/signUp?email='+email+"&name="+name+"&password="+password)
    .map(data => data.json())
    .catch(this.handleError);
  }

  handleError(error) {
    return Observable.throw(error);
  }

}
