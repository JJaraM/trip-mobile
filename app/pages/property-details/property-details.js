import {Page, NavController, NavParams, Alert, ActionSheet, ViewController} from 'ionic-framework/ionic';
import {PropertyService} from '../../services/property-service';
import {TripService} from '../../services/tripService';
import {DatePicker} from 'ionic-native';
import {UserFactory} from '../../services/userFactory';

@Page({
    templateUrl: 'build/pages/property-details/property-details.html'
})
export class PropertyDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [PropertyService], [TripService], [UserFactory], [ViewController]];
    }

    constructor(nav, navParams, propertyService, tripService, userFactory, viewController) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.tripService = tripService;
        this.property = navParams.get('property');
        this.country = navParams.data;
        this.startDate = new Date();
        this.endDate = new Date();
        this.dateChange = false;
        this.userFactory = userFactory;
        this.viewController = viewController;
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

    changeKnowDates() {
      this.dateChange = !this.dateChange;
    }

    createTrip() {
      this.userFactory.findUserInSession().then((resultSet) => {
          this.storeTrip(resultSet.res.rows[0].id);
      }, (err) => {
          console.log('Error: ', err);
      });
    }

    storeTrip(id) {
      this.tripService.create(id, this.country.name, this.startDate, this.endDate).subscribe(
        data => {
            this.viewController.dismiss();
        },
        error => this.error(error)
      );
    }

    dismiss() {
      this.viewController.dismiss();
    }

}
