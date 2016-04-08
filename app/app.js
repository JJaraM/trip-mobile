import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {WelcomePage} from './pages/welcome/welcome';

import {PropertyListPage} from './pages/property-list/property-list';
import {PropertyDetailsPage} from './pages/property-details/property-details';
import {PropertyService} from './services/property-service';
import {LoginService} from './services/loginService';


import {LoginPage} from './pages/login/login';
import {provide} from 'angular2/core';
import {TranslateService, TranslateLoader, TranslateStaticLoader, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from 'angular2/http';
import {RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import {DatePicker} from 'ionic-native';

import {AlertService} from './services/alert-service';
import {TripService} from './services/tripService';
import {TravelService} from './services/travel-service';

/*Factories*/
import {UserFactory} from './services/userFactory';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers:
  [
    PropertyService, LoginService, TripService, TravelService, AlertService, UserFactory,
    provide(TranslateLoader, {
      useFactory: (http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    TranslateService
  ]
})
@RouteConfig([
  {path: '/', component: WelcomePage, as: 'WelcomePage'},
  {path: '/trip', component: PropertyListPage, as: 'PropertyListPage'},
  {path: '/trip/create', component: PropertyDetailsPage, as: 'PropertyDetailsPage'}
])
class MyApp {

  static get parameters() {
    return [[IonicApp], [Platform], [Http], [TranslateService], [TripService],  [TravelService], [UserFactory]];
  }

  constructor(app, platform, http, translate, tripService, travelService, userFactory) {

    // set up our app
    this.app = app;
    this.http = http;
    this.translate = translate;
    this.platform = platform;
    this.translationConfig();
    this.initializeApp();
    this.searchQuery = '';
    this.pages = [];
    // make PropertyListPage the root (or first) page
    this.rootPage = LoginPage;
    this.tripService = tripService;
    this.travelService = travelService;
    this.userFactory = userFactory;
    this.initNotificationList();
  }

  initNotificationList() {
    this.now = [];
    this.before = [];
  }

  getItems(searchbar) {

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.userFactory.setNewPlace(true);
      this.fetchRecentPlaces();
      return;
    }

    this.now = this.now.filter((v) => {
      if (v.place.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  translationConfig() {
    this.translate.use('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  fetchRecentPlaces() {
    if ((this.places == undefined || this.places.length == 0) && this.userFactory.getNewPlace() ) {
        this.userFactory.findUserInSession().then((resultSet) => {
          this.travelService.fetchAll(resultSet.res.rows[0].id,'').subscribe(
            data => {
              this.initNotificationList();
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                item.url = item.place.photos[0].prefix + '36x36' + item.place.photos[0].suffix
                var endDate = new Date(item.endDate);
                if (this.today(endDate)) {
                  this.now.push(item);
                } else {
                  this.before.push(item);
                }
              }

            }
          );
        }, (err) => {
          console.log('Error: ', err);
        });
        this.userFactory.setNewPlace(false);
      }
    }

    today(td){
      var d = new Date();
      return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear();
    }
}
