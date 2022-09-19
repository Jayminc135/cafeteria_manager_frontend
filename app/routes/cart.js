import Route from '@ember/routing/route';
import config from '../config/environment';
import RSVP from 'rsvp';

export default class CartRoute extends Route {
    async model() {
        const url = config.APP.URL;
        let response = await fetch(url + '/getcart?userid=' + localStorage.getItem('UserId'));
        let cart = await response.json();
        let total = 0;
        for (let i = 0; i < cart.length; i++) { 
            total += (cart[i].menu_item_price * cart[i].quantity); 
        }
        return RSVP.hash({ 
            cart: cart,
            price: total 
        });
    }
}
