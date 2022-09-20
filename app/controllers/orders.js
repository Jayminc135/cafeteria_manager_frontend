import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class OrdersController extends Controller {
    @tracked items = {};
    @tracked firstitem = {};
    @tracked total;
    @tracked name = localStorage.getItem('UserName');
    @tracked isorderpending = false;
    @tracked username = "";
    
    @action
    async fetchitems(orderid, orderstatus, userid) {
        const url = config.APP.URL;

        //fetch orderitems
        let response = await fetch(url + '/getorderitems?orderid=' + orderid);
        let orderitems = await response.json();

        let _total = 0;
        for (let i = 0; i < orderitems.length; i++) { 
            _total += (orderitems[i].menu_item_price * orderitems[i].quantity); 
        }
        this.set("total", _total);
        this.set("firstitem",orderitems[0]);
        this.set("items", orderitems);

        if(orderstatus == 'pending delivery') {
            this.set("isorderpending", true);
        }
        else {
            this.set("isorderpending", false);
        }

        //fetch user of the order
        let res = await fetch(url + '/getuser?userid=' + userid);
        let user = await res.json();
        this.set("username", user.first_name + ' ' + user.last_name);
    }

    @action
    async save(order_id) {
        //check if checkbox is checked or not
        let checkBox = document.getElementById('flexCheckDefault_' + order_id);
        if(checkBox.checked) {
            const url = config.APP.URL;
            let response = await fetch(url + '/changeorderstatus/' + order_id, {
                method: 'PUT'
            });
            console.log(order_id);
        }
    }
}
