import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let favorites = [],
    propertiesURL = SERVER_URL + 'properties/',
    favoritesURL = propertiesURL + 'favorites/',
    likesURL = propertiesURL + 'likes/';

@Injectable()
export class PropertyService {

    static get parameters() {
        return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(propertiesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getFavorites() {
        return this.http.get(favoritesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    like(property) {
        let body = JSON.stringify(property);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(likesURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    favorite(property) {
        let body = JSON.stringify(property);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(favoritesURL, body, options)
            .catch(this.handleError);
    }

    unfavorite(property) {
        return this.http.delete(favoritesURL + property.id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.log('There is an error');
        return Observable.throw(error || 'Server error');
    }

    autocomplete(query) {
      return this.http.get('https://gd.geobytes.com/AutoCompleteCity?q='+query)
            .map(data => this.process(data, query));
    }

    findAll() {
      return this.http.get('https://restcountries.eu/rest/v1/all')
            .map(data => data.json());
    }

    process(data, query) {
      var dataItems = [];
      data.json().forEach(function(place){
        let item = {'name': place.split(',')[0], 'from' :place.split(',')[2]};
        dataItems.push(item);
      });
      var place = {
        "country": {
          letter: query.substring(0, 1).toUpperCase(),
          items : dataItems
        }
      };
      return place;
    }




}
