import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TravelService {

  static get parameters() {
    return [[Http]];
  }

  constructor (http) {
    this.http = http;
  }

  handleError(error) {
    return Observable.throw(error.status);
  }

  fetchAll(userId) {
    return this.http.get('http://localhost:8083/trip/api/travel/fetchAll?userId='+userId)
      .map(data => data.json())
      .catch(this.handleError);
  }

  schedulePlace(tripId, placeId, startDate, endDate) {
    return this.http.post('http://localhost:8083/trip/api/travel/schedulePlace?tripId='+tripId+"&placeId="+placeId+"&startDate="+startDate+"&endDate="+endDate)
      .map(data => data)
      .catch(this.handleError);
  }

}
