import {Page, NavController, NavParams, Modal, ViewController} from 'ionic-framework/ionic';
import {TripService} from '../../services/tripService';
import {PlaceCreate} from '../place-create/place-create';

@Page({ templateUrl: 'build/pages/place-list/place-list.html' })
export class PlaceListPage {

  static get parameters() {
    return [[NavController], [NavParams], [TripService], [ViewController]];
  }

  constructor(nav, navParams, tripService, viewController) {
    this.nav = nav;
    this.viewController = viewController;
    this.navParams = navParams;
    this.tripService = tripService;
    this.initParms();
    this.initVars();
    this.fetchByCategory();
  }

  initParms() {
    this.tripId = this.navParams.get("_tripId");
    this.categoryId = this.navParams.get("_categoryId");
  }

  initVars() {
    this.places = [];
  }

  getItems(searchbar) {
    this.isSearching = true;
    this.q = searchbar.value;
    (this.q.trim() == '' || this.places.length == 0) ? this.fetchByCategory() : this.filter();
  }

  filter() {
    this.places = this.places.filter((place) => place.name.toLowerCase().indexOf(this.q.toLowerCase()) > -1);
  }

  fetchByCategory() {
    this.tripService.fetchNearPlacesByLocationNameAndCategory(this.tripId, this.categoryId).subscribe(
      data => {
        this.places = data;
        this.places.forEach(function (place) {
          place.url = place.photos[0].prefix + '36x36' + place.photos[0].suffix;
          place.completeAddress = place.location.address;
          place.completeAddress += (place.location.crossStreet != undefined && place.location.crossStreet != 'null' && place.location.crossStreet.trim().length > 0 ) 
          ? ' (' + place.location.crossStreet + ')'             : '';
        });
        console.log(this.places);
        if (this.isSearching)
          this.filter();
      }
    );
  }

  cancel() {
    this.viewController.dismiss();
  }

  schedule(place) {
    let data = {_placeId: place.referenceId, _placeName: place.name, _tripId: this.tripId, _viewController : this.viewController };
    let modal = Modal.create(PlaceCreate, data);
    this.nav.present(modal);
  }

}
