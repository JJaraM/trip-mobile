import {Page, NavController, NavParams, Alert} from 'ionic-framework/ionic';
import {TranslatePipe} from 'ng2-translate/ng2-translate'
import {WelcomePage} from '../../pages/welcome/welcome';
import $ from 'jquery/dist/jquery';
import {LoginService} from '../../services/loginService';
import {UserFactory} from '../../services/userFactory';
@Page({
    templateUrl: 'build/pages/login/login.html',
    pipes: [TranslatePipe]
})
export class LoginPage {

    static get parameters() {
        return [[NavController], [NavParams], [LoginService], [UserFactory]];
    }

    constructor(nav, navParams, loginService, userFactory) {
        this.userFactory = userFactory;
        this.nav = nav;
        this.loginService = loginService;
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
        this.showAlert('Required email address', 'Enter an email address');
      } else if (this.isEmpty(this.password)) {
        this.showAlert('Required password', 'Enter an password');
      } else {
        this.loginService.signIn(this.email, this.password).subscribe(
          data => this.storeSession(data),
          error => this.error(error)
        );
      }
    }

    signUp() {
      if (this.isEmpty(this.name)) {
        this.showAlert('Required name', 'Enter a name');
      } else if (this.isEmpty(this.password)) {
        this.showAlert('Required email address', 'Enter an email address');
      } else if (this.isEmpty(this.password)) {
        this.showAlert('Required password', 'Enter a password');
      } else {
        this.loginService.signUp(this.email, this.name, this.password).subscribe(
          data => this.storeSession(data),
          error => this.error(error)
        );
      }
    }

    error(error) {
      if (error.status == 404) {
        this.showAlert('Invalid account', 'The user does not exit');
      } else if (error.status == 200 ) {
        this.showAlert('Error connection', 'Ops! There is a problem with the server');
      }
    }

    storeSession(data) {
      this.userFactory.storeInSession(data.id, data.email, data.name);
      this.nav.push(WelcomePage);
    }

    showAlert(pTitle, pSubTitle) {
      let alert = Alert.create({
        title: pTitle,
        subTitle: pSubTitle,
        buttons: ['Ok']
      });
      this.nav.present(alert);
    }

    isEmpty(string) {
      return string.trim().length == 0;
    }



}
