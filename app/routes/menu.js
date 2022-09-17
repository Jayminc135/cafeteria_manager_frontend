import Route from '@ember/routing/route';
import config from '../config/environment';
//import MenucategoryModel from '../models/menucategory';
//import RSVP from 'rsvp';

export default class MenuRoute extends Route {
    async model() {
        const url = config.APP.URL;
        let response = await fetch(url + '/menucategories');
        let menucategories = await response.json();
        return { menucategories };
    }
}