import {Page, NavController, NavParams, Modal, ViewController} from 'ionic-framework/ionic';
import {PlaceListPage} from '../place-list/place-list';
import {TripService} from '../../services/tripService';

@Page({ templateUrl: 'build/pages/place-sub-category/place-sub-category.html' })
export class PlacesSubCategory {

  static get parameters() {
    return [[NavController], [NavParams], [ViewController], [TripService]];
  }

  constructor(nav, navParams, viewController, tripService) {
    this.nav = nav;
    this.viewController = viewController;
    this.navParams = navParams;
    this.tripService = tripService;
    this.subcategories = [];
    this.subcategoriesOriginalSize = 0;
    this.initParms();
    this.buildSubCategories();
  }

  initParms() {
    this.subCategory = this.navParams.get("_subCategory");
    this.tripId = this.navParams.get("_tripId");
  }

  buildSubCategories() {
    var ids = [];
    switch(this.subCategory) {
      case 'FOOD':
        ids = ['4bf58dd8d48988d1c4941735','4bf58dd8d48988d155941735', '4bf58dd8d48988d16d941735', '4bf58dd8d48988d142941735',
        '4bf58dd8d48988d10c941735', '4bf58dd8d48988d14e941735', '4bf58dd8d48988d1ca941735', '4bf58dd8d48988d107941735',
        '4bf58dd8d48988d1cc941735', '4bf58dd8d48988d17a941735', '4bf58dd8d48988d16c941735', '4eb1bfa43b7b52c0e1adc2e8',
        '4bf58dd8d48988d1d3941735', '4bf58dd8d48988d115941735'];
      break;
      case 'OUT_SIDE':
        ids = ['4bf58dd8d48988d1e2941735', '4bf58dd8d48988d15a941735', '4bf58dd8d48988d163941735', '4eb1d4dd4b900d56c88a45fd',
        '4bf58dd8d48988d161941735', '52e81612bcbc57f1066b7a22', '56aa371be4b08b9a8d573560'];
        break;
      case 'ENTERTAINMENT':
        ids = ['4bf58dd8d48988d17f941735', '5032792091d4c4b30a586d5c', '4bf58dd8d48988d188941735'];
      break;
    }

    this.tripService.fetchLastPlacesByTripAndCategories(this.tripId, ids).subscribe(
      data => {
        this.subcategories =  data;
        this.subcategoriesOriginalSize = this.subcategories.length;
        this.subcategories.forEach(function (place) {
          place.img = place.photos[0].prefix + '36x36' + place.photos[0].suffix;
        });
        if (this.isSearching)
        this.filter();
      }
    );
  }

  getItems(searchbar) {
    this.isSearching = true;
    this.q = searchbar.value;
    (this.subcategoriesOriginalSize > this.subcategories.length) ? this.buildSubCategories() : this.filter();
  }

  filter() {
    this.subcategories = this.subcategories.filter((place) => place.category.name.toLowerCase().indexOf(this.q.toLowerCase()) > -1);
  }

  select(categoryId) {
    this.nav.present(Modal.create(PlaceListPage, {_tripId : this.tripId, _categoryId : categoryId}));
    this.buildSubCategories();
  }

  cancel() {
    this.viewController.dismiss();
  }
}
