import {Page, NavController, NavParams, Modal, ViewController} from 'ionic-framework/ionic';
import {ROUTER_DIRECTIVES, Router, Location, RouteConfig} from "angular2/router";
import {UserFactory} from '../../services/userFactory';
import {TripService} from '../../services/tripService';
import {PlacesSubCategory} from '../place-sub-category/place-sub-category';
import {PropertyListPage} from '../property-list/property-list';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {

    static get parameters() {
        return [[NavController], [NavParams], [Router],[UserFactory],[TripService], [ViewController]];
    }

    constructor(nav, navParams, router, userFactory, tripService, viewController) {
        this.nav = nav;
        this.router = router;
        this.userFactory = userFactory;
        this.tripService = tripService;
        this.viewController = viewController;
        this.trips = [];
        this.name = '';
        this.setName();
        this.findAllTrips();
    }

    createTrip() {
      this.nav.present(Modal.create(PropertyListPage));
    }

    selectPlace(tripId, subCategory) {
      this.nav.present(Modal.create(PlacesSubCategory, {_tripId : tripId, _subCategory : subCategory}));
    }

    setName() {
      this.userFactory.findUserInSession().then((resultSet) => {
          this.name = resultSet.res.rows[0].name;
      }, (err) => {
          console.log('Error: ', err);
      });
    }

    findAllTrips() {
      this.userFactory.findUserInSession().then((resultSet) => {
        this.tripService.findAllByUser(resultSet.res.rows[0].id).subscribe(
          data => this.trips = data
        );
      }, (err) => {
          console.log('Error: ', err);
      });
    }

}
