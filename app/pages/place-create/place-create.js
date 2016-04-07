import {Page, NavController, NavParams, Modal, ViewController} from 'ionic-framework/ionic';
import {TripService} from '../../services/tripService';
import {UserFactory} from '../../services/userFactory';

@Page({
  templateUrl: 'build/pages/place-create/place-create.html'
})
export class PlaceCreate {

  static get parameters() {
    return [[NavController], [NavParams], [TripService],[ViewController],[UserFactory]];
  }

  constructor(nav, navParams, tripService, viewController, userFactory) {
    this.nav = nav;
    this.viewController = viewController;
    this.userFactory = userFactory;
    this.tripService = tripService;
    this.navParams = navParams;
    this.initParams();
    this.initDates();
  }

  initParams() {
    this.tripId = this.navParams.get("_tripId");
    this.placeId = this.navParams.get("_placeId");
    this.placeName = this.navParams.get("_placeName");
  }

  initDates() {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  startDate() {
      DatePicker.show({ date: this.startDate, mode: 'date'}).then(
        date => { this.startDate = date; },
        error => { console.log(error); }
      );
  }

  endDate() {
      DatePicker.show({ date: this.endDate, mode: 'date'}).then(
        date => { this.endDate = date; },
        error => { console.log(error); }
      );
  }

  schedule() {
      this.tripService.schedulePlace(this.tripId, this.placeId, this.startDate, this.endDate).subscribe(
        data => {
          this.userFactory.setNewPlace(true);
          this.viewController.dismiss();
        }
      );
  }
}
