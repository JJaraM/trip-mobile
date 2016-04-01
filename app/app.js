import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {PropertyDetailsPage} from './pages/property-details/property-details';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {LoginService} from './services/loginService';
import {TripService} from './services/tripService';
import {BrokerService} from './services/broker-service';
import {LoginPage} from './pages/login/login';
import {provide} from 'angular2/core';
import {TranslateService, TranslateLoader, TranslateStaticLoader, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from 'angular2/http';
import {RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import {DatePicker} from 'ionic-native';

import {AlertService} from './services/alert-service';

/*Factories*/
import {UserFactory} from './services/userFactory';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers:
  [
    PropertyService, BrokerService, LoginService, TripService, AlertService, UserFactory,
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
    return [[IonicApp], [Platform], [Http], [TranslateService]];
  }

  constructor(app, platform, http, translate) {

    // set up our app
    this.app = app;
    this.http = http;
    this.translate = translate;
    this.platform = platform;
    this.translationConfig();
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Login', component: LoginPage, icon: "home", img:"https://i.ytimg.com/vi/lfUIGflbwx8/maxresdefault.jpg", name:"Tower", time:"(13:00 - 13:30)"},
      {title: 'Welcome', component: WelcomePage, icon: "bookmark", img:"https://www.visitbritainshop.com/espana/~/media/91f5c92f5c6b4894911c474e23f5849a.ashx?as=0&h=349&w=620", name:"London Eye", time:"(14:00 - 14:30)"},
      {title: 'Properties', component: PropertyListPage, icon: "home", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Palace_of_Westminster,_London_-_Feb_2007.jpg/980px-Palace_of_Westminster,_London_-_Feb_2007.jpg", name:"Palacio de Westminster", time:"(14:30 - 16:00)"},
      {title: 'Create-Trip', component: PropertyDetailsPage, icon: "home", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Buckingham_Palace_from_gardens,_London,_UK_-_Diliff.jpg/300px-Buckingham_Palace_from_gardens,_London,_UK_-_Diliff.jpg", name:"Palacio de Buckingham", time:"(16:00 - 16:30)"},
      {title: 'Brokers', component: BrokerListPage, icon: "people", img:"http://www.sightseeingtours.co.uk/images/products/gt-london-attracts/xl-p-474-Churchill-Cabinet-War-Rooms.jpg", name:"Churchill War Rooms", time:"(16:30 - 19:00)"}
    ];

    // make PropertyListPage the root (or first) page
    this.rootPage = LoginPage;
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

}
