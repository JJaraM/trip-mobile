import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomePage} from '../../pages/welcome/welcome';
import {LoginService} from '../../services/loginService';
import {UserFactory} from '../../services/userFactory';
import {AlertService} from '../../services/alert-service';
import $ from 'jquery/dist/jquery';

@Page({ templateUrl: 'build/pages/login/login.html', pipes: [TranslatePipe] })
export class LoginPage {

  static get parameters() {
    return [[NavController], [LoginService], [UserFactory], [TranslateService], [AlertService]];
  }

  constructor(nav, loginService, userFactory, translate, alertService) {
    this.userFactory = userFactory;
    this.nav = nav;
    this.loginService = loginService;
    this.translate = translate;
    this.alertService = alertService;
    this.initializeAttributes();
  }

  initializeAttributes() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.active = false;
  }

  showPanel(showId, hideId) {
    this.initializeAttributes();
    $(showId).removeClass('hide');
    $(showId).addClass('show animated fadeIn');
    $(hideId).removeClass('show animated fadeIn');
    $(hideId).addClass('hide');
    this.active = true;
  }

  signIn() {
    if (this.isEmpty(this.email)) {
      this.alertService.ok('messages.login.email.title', 'messages.login.email.subTitle', this.nav);
    } else if (this.isEmpty(this.password)) {
      this.alertService.ok('messages.login.password.title', 'messages.login.password.subTitle', this.nav);
    } else {
      this.loginService.signIn(this.email, this.password).subscribe(
        data => this.storeSession(data),
        error => this.error(error)
      );
    }
  }

  signUp() {
    if (this.isEmpty(this.name)) {
      this.alertService.ok('messages.login.name.title', 'messages.login.name.subTitle', this.nav);
    } else if (this.isEmpty(this.email)) {
      this.alertService.ok('messages.login.email.title', 'messages.login.email.subTitle', this.nav);
    } else if (this.isEmpty(this.password)) {
      this.alertService.ok('messages.login.password.title', 'messages.login.password.subTitle', this.nav);
    } else {
      this.loginService.signUp(this.email, this.name, this.password).subscribe(
        data => this.storeSession(data),
        error => this.error(error)
      );
    }
  }

  error(error) {
    if (error.status == 404) {
      this.alertService.ok('messages.login.error.invalid.account.title', 'messages.login.error.invalid.account.subTitle', this.nav);
    } else if (error.status == 200 ) {
      this.alertService.serverDown(this.nav);
    }
  }

  storeSession(data) {
    this.userFactory.storeInSession(data.id, data.email, data.name);
    this.nav.push(WelcomePage);
  }

  isEmpty(string) {
    return string.trim().length == 0;
  }

}
