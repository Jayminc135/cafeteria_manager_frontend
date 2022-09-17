import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class MenuController extends Controller {
    menuitems = {};
    @tracked Addbutton_clicked = false; 
    @action
    async fetchitems(id) {
        const url = config.APP.URL;
        let response = await fetch(url + '/menuitems?id=' + id);
        let items = await response.json();
        //console.log(items);
        this.set("menuitems",items);
    }

    @action
    async AddtoCart(category_id, item_id) {
        this.set("Addbutton_clicked", true);
        const cart = {
            user_id: localStorage.getItem('UserId'),
            menu_category_id: category_id,
            menu_item_id: item_id
        }
        const url = config.APP.URL;
        const response = await fetch(url + '/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
        });
        console.log(response);
        if (response.statusText == "Created") {
            console.log("Created");
        } else {
            console.log("Not Created");
        }
    }
}
