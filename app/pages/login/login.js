import {Page, NavController, NavParams, Alert} from 'ionic-framework/ionic';
import {TranslatePipe} from 'ng2-translate/ng2-translate'
import {ROUTER_DIRECTIVES, Location, RouteConfig} from "angular2/router";
import {WelcomePage} from '../../pages/welcome/welcome';
import $ from 'jquery/dist/jquery';

@Page({
    templateUrl: 'build/pages/login/login.html',
    pipes: [TranslatePipe]
})
export class LoginPage {


    static get parameters() {
        return [[NavController], [NavParams]];
    }

    constructor(nav, navParams) {
        this.nav = nav;
        this.active = false;
        this.password = '';
        this.email = '';
    }

    signIn() {
      $('#signIn').removeClass('hide');
      $('#signIn').addClass('show animated fadeIn');

      if (this.active && this.isValid()) {
        this.nav.push(WelcomePage);
      }
      this.active = true;
    }

    isValid() {
      let result = false;
      if (this.isEmpty(this.email)) {
        this.showAlert('Required email address', 'Enter an email address');
      } else if (this.isEmpty(this.password)) {
        this.showAlert('Required password', 'Enter an password');
      } else {
        result = true;
      }
      return result;
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

    signUp() {
      console.log('signUp');
    }

}
