import Route from '@ember/routing/route';
import config from '../config/environment';
import RSVP from 'rsvp';

export default class OrdersRoute extends Route {
    beforeModel() {
        if(localStorage.getItem("IsAuthenticated") != "true") {
            this.transitionTo('signup');
        }
    }

    async model() {
        const url = config.APP.URL;
        let response;
        if(localStorage.getItem('role') != 'customer')
            response = await fetch(url + '/getorders');
        else
            response = await fetch(url + '/getorders?userid=' + localStorage.getItem('UserId'));

        let orders = await response.json();

        let isCustomer = false;
        let isOwner = false;
        if(localStorage.getItem('role') == 'customer') {
            isCustomer = true;
        }
        else if(localStorage.getItem('role') == 'owner')  
            isOwner = true;

        return RSVP.hash ({ 
            orders: orders,
            isCustomer: isCustomer,
            isOwner: isOwner
        });
    }
}
