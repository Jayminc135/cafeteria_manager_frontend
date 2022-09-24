import Route from '@ember/routing/route';
import config from '../config/environment';
import RSVP from 'rsvp';

export default class MenuRoute extends Route {
    beforeModel() {
        if(localStorage.getItem("IsAuthenticated") != "true") {
            this.transitionTo('signup');
        }
    }

    async model() {
        const url = config.APP.URL;
        let response = await fetch(url + '/menucategories');
        let menucategories = await response.json();

        let isOwner = false;
        if(localStorage.getItem('role') == 'owner') {
            isOwner = true;
        }  
        return RSVP.hash ({ 
            menucategories: menucategories,
            isOwner: isOwner
        });
    }
}