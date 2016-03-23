import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-framework/ionic';
import {BrokerDetailsPage} from '../broker-details/broker-details';
import {PropertyService} from '../../services/property-service';
import {DatePicker} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/property-details/property-details.html'
})
export class PropertyDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [PropertyService]];
    }

    constructor(nav, navParams, propertyService, platform) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.property = navParams.get('property');
        this.country = navParams.data;
        this.startDate = new Date();
        this.dateChange = false;
    }

    startDate() {
        DatePicker.show({ date: this.startDate, mode: 'date'}).then(
          date => { this.startDate = date; },
          error => { console.log(error); }
        );
    }

    changeKnowDates() {
      this.dateChange = !this.dateChange;
      this.test = 'casa';
    }

}
