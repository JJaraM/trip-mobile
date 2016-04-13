import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Storage, LocalStorage, SqlStorage} from 'ionic-framework/ionic';

@Injectable()
export class CategoryFactory {

  get(key) {
    var expression = [];
    switch(key) {
      case RESTAURANTS:
        expression.push('4bf58dd8d48988d1c4941735');//Restaurants
        expression.push('4bf58dd8d48988d155941735');//Gastropub
        break;
      case n:
        code block
        break;
      default:
        default code block
    }
  }
}
