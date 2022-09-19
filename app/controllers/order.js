import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class OrderController extends Controller {
    @tracked items = {};
    @tracked firstitem = {};
    @tracked total;
    @tracked name = localStorage.getItem('UserName');

    @action
    async fetchitems(orderid) {
        const url = config.APP.URL;
        let response = await fetch(url + '/getorderitems?orderid=' + orderid);
        let orderitems = await response.json();
        let _total = 0;
        for (let i = 0; i < orderitems.length; i++) { 
            _total += (orderitems[i].menu_item_price * orderitems[i].quantity); 
        }

        this.set("total", _total);
        this.set("firstitem",orderitems[0]);
        this.set("items", orderitems);
    }
}
