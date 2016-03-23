import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {LoginService} from './services/loginService';
import {BrokerService} from './services/broker-service';
import {LoginPage} from './pages/login/login';
import {provide} from 'angular2/core';
import {TranslateService, TranslateLoader, TranslateStaticLoader, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from 'angular2/http';
import { RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import {DatePicker} from 'ionic-native';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers:
  [
    PropertyService, BrokerService, LoginService,
    provide(TranslateLoader, {
      useFactory: (http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    TranslateService
  ]
})
@RouteConfig([
    {path: '/', component: WelcomePage, as: 'WelcomePage'},
    {path: '/trip', component: PropertyListPage, as: 'PropertyListPage'}
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
      {title: 'Login', component: LoginPage, icon: "home"},
      {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
      {title: 'Properties', component: PropertyListPage, icon: "home"},
      {title: 'Brokers', component: BrokerListPage, icon: "people"},
      {title: 'Favorites', component: FavoriteListPage, icon: "star"}
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
