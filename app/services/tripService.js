import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TripService {

  static get parameters() {
    return [[Http]];
  }

  constructor (http) {
    this.http = http;
  }

  handleError(error) {
    return Observable.throw(error.status);
  }

  findAllByUser(userId) {
    return this.http.get('http://localhost:8083/trip/api/trip/fetchAllByUser?userId='+encodeURIComponent(userId))
    .map(data => data.json())
    .catch(this.handleError);
  }

  create(userId, location, startDate, endDate) {
    return this.http.post('http://localhost:8083/trip/api/trip/create?userId='+encodeURIComponent(userId)+"&location="+location+"&startDate="+startDate+"&endDate="+endDate)
    .map(data => data)
    .catch(this.handleError);
  }

  fetchNearPlacesByLocationNameAndCategory(tripId, categoryId) {
    return this.http.get('http://localhost:8083/trip/api/place/fetchNearPlacesByLocationNameAndCategory?tripId='+tripId+"&categoryId="+categoryId)
      .map(data => data.json())
      .catch(this.handleError);
  }

  fetchLastPlacesByTripAndCategories(tripId, categories) {
    return this.http.get('http://localhost:8083/trip/api/place/fetchLastPlacesByTripAndCategories?tripId='+tripId+"&categories="+categories)
      .map(data => data.json())
      .catch(this.handleError);
  }

}
