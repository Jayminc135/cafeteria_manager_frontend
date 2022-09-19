import Route from '@ember/routing/route';
import config from '../config/environment';

export default class OrderRoute extends Route { 
    async model() {
        const url = config.APP.URL;
        let response = await fetch(url + '/getorders?userid=' + localStorage.getItem('UserId'));
        let orders = await response.json();
        return { orders };
    }
}
