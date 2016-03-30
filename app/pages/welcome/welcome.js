import {Page, NavController, NavParams, Modal} from 'ionic-framework/ionic';
import {ROUTER_DIRECTIVES, Router, Location, RouteConfig} from "angular2/router";
import {PropertyListPage} from '../../pages/property-list/property-list';
import {UserFactory} from '../../services/userFactory';
import {TripService} from '../../services/tripService';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {

    static get parameters() {
        return [[NavController], [NavParams], [Router],[UserFactory],[TripService]];
    }

    constructor(nav, navParams, router, userFactory, tripService) {
        this.nav = nav;
        this.router = router;
        this.userFactory = userFactory;
        this.tripService = tripService;
        this.trips = [];
        this.name = '';
        this.setName();
        this.findAllTrips();
    }

    createTrip() {
      let modal = Modal.create(PropertyListPage);
      this.nav.present(modal);
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
