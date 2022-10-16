import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class CartController extends Controller {
    @tracked TotalPrice = 0;
    @tracked updated = false;
    
    @action
    async changeQuantity(cart_id) {
        let quantity = event.target.value;
        const url = config.APP.URL;

        let cart = {
            cart_id: cart_id,
            user_id: localStorage.getItem('UserId'),
            quantity: quantity
        }
        const response = await fetch(url + '/updatequantity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        let price = await response.json();
        this.set("updated", true);
        this.set("TotalPrice", price);

        //to not to display cartitem to user
        if(quantity == 0)
            document.getElementById('cartitem_' + cart_id).innerHTML = "";
    }

    @action
    async redirect() {
        const url = config.APP.URL;
        let response = await fetch(url + '/getcart?userid=' + localStorage.getItem('UserId'));
        let cart = await response.json();
        if(cart.length != 0) {        
            const order = {
                user_id: localStorage.getItem('UserId'),
                status: "pending delivery"
            }

            //create order
            const res = await fetch(url + '/addorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
            });
            let order_id = await res.json();
            
            //add order items
            let response = await fetch(url + '/getcart?userid=' + localStorage.getItem('UserId'));
            let cartitems = await response.json();

            for(let i=0;i<cartitems.length;i++) {
                const orderitem = {
                    order_id: order_id,
                    menu_item_id: cartitems[i].menu_item_id,
                    menu_item_name: cartitems[i].menu_item_name,
                    menu_item_price: cartitems[i].menu_item_price,
                    quantity: cartitems[i].quantity
                }

                const res = await fetch(url + '/addorderitem', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderitem)
                });
            }

            //delete cart items
            let result = await fetch(url + '/clearcart/' + localStorage.getItem('UserId'), {
                method: 'DELETE'
            });
        }
        this.transitionToRoute('orders');
    }
}
