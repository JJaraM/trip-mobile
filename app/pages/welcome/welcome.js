import {Page, NavController, NavParams, Modal} from 'ionic-framework/ionic';
import {ROUTER_DIRECTIVES, Router, Location, RouteConfig} from "angular2/router";
import {PropertyListPage} from '../../pages/property-list/property-list';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {

    static get parameters() {
        return [[NavController], [NavParams], [Router]];
    }

    constructor(nav, navParams, router) {
        this.nav = nav;
        this.router = router;
    }

    createTrip() {
      let modal = Modal.create(PropertyListPage);
      this.nav.present(modal);
    }

}
