import {Injectable} from 'angular2/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Alert} from 'ionic-framework/ionic';

/**
* Service to manage the alert messages
*/
@Injectable()
export class AlertService {

  /**
  * Paramaters to be injected
  */
  static get parameters() {
    return [[TranslateService]];
  }

  /**
  * @param translateService specifies the service to be used to get the key values
  */
  constructor (translateService) {
    this.translateService = translateService;
  }

  /**
  * Display a message alert
  * @param keyTitle a key to be search in i18n file. Specifies the title attribute to be displayed in the alert message
  * @param keySubtitle a key to search in i18n file. Specifies the subTitle attribute to be displayed in the alert message
  * @param navController a object from Page file to be displayed
  **/
  ok(keyTitle, keySubtitle, navController) {
    this.translateService.get(keyTitle).subscribe(_title => {
      this.translateService.get(keySubtitle).subscribe(_subtitle => {
        let alert = Alert.create({
          title: _title,
          subTitle: _subtitle,
          buttons: ['Ok']
        });
        navController.present(alert);
      });
    });
  }

  /**
  * Display a predifine message to be displayed with there is an error on the server
  * @param navController a object from Page file to be displayed
  **/
  serverDown(navController) {
    this.ok('messages.server.down.title', 'messages.server.down.subTitle', navController);
  }

}
