import Route from '@ember/routing/route';
import config from '../config/environment';

export default class MenuRoute extends Route {
    async model() {
        const url = config.APP.URL;
        let response = await fetch(url + '/menucategories');
        let menucategories = await response.json();
        return { menucategories };
    }
}