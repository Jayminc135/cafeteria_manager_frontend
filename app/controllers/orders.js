import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class OrdersController extends Controller {
    @tracked items = {};
    @tracked firstitem = {};
    @tracked total;
    @tracked isorderpending = false;
    @tracked username = "";
    @tracked feedback_rating = 0; 
    @tracked isfeedbacksaved = false;
    @tracked isfeedbackgiven = false;
    @tracked order = {};
    @tracked filledstar = {};
    @tracked blankstar = {};
    @tracked experience = "";
    
    @action
    async fetchitems(orderid, userid) {
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

        //set customer name of order
        let res = await fetch(url + '/getuser?userid=' + userid);
        let user = await res.json();
        if(user.role == "clerk")
            this.set("username", "Walk-in customer");
        else
            this.set("username", user.first_name + ' ' + user.last_name);

        //fetch order
        let res_data = await fetch(url + '/getorder?orderid=' + orderid);
        let order = await res_data.json();
        
        if(order.status == 'pending delivery') {
            this.set("isorderpending", true);
        }
        else {
            this.set("isorderpending", false);
        }
        
        this.set("isfeedbackgiven", false);
        if(order.rating != null || order.experience != null) {
            this.set("isfeedbackgiven", true);
            if(order.rating == null)
                order.rating = 0;
            this.filledstar = Array(order.rating).fill(0);
            this.blankstar = Array(5 - order.rating).fill(0);
            this.experience = order.experience;
        }

        //set "Mark as delivered" checkbox not checked
        if(document.getElementById('flexCheckDefault_' + orderid))
            document.getElementById('flexCheckDefault_' + orderid).checked = false;

        //set rating stars and experience input property
        for(let i=1; i<=5; i++) {
            var element = document.getElementById("star_" + orderid + i);
            if(element)
                element.classList.remove("clicked");
        }
        if(document.getElementById('textarea_' + orderid))
            document.getElementById('textarea_' + orderid).value = "";
        this.set("feedback_rating", 0);

        //set feedback property
        this.set('isfeedbacksaved', false);
    }

    @action
    async save(order_id) {
        //check if checkbox is checked or not
        let checkBox = document.getElementById('flexCheckDefault_' + order_id);
        if(checkBox.checked) {
            this.set("isorderpending", false);
            document.getElementById('status_' + order_id).innerHTML = "Delivered";
            const url = config.APP.URL;
            let response = await fetch(url + '/changeorderstatus/' + order_id, {
                method: 'PUT'
            });
        }
    }

    @action
    async savefeedback(order_id) {
        let experience = document.getElementById('textarea_' + order_id).value.trim();
        if(this.feedback_rating != 0 || experience != "") {
            const url = config.APP.URL;
            const feedback = {
                rating: this.feedback_rating,
                experience: experience
            }
            const response = await fetch(url + '/addfeedback/' + order_id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
            });
            if(response.statusText == "Created") {
                this.set('isfeedbacksaved', true);
            }
        }
    }

    @action
    star() {
        let star_number = event.target.id;
        let rating = star_number.slice(-1);
        this.set("feedback_rating", rating);
        
        for(let i=1; i<=5; i++) {
            var element = document.getElementById(star_number.substring(0, star_number.length - 1) + i);
            element.classList.remove("clicked");
        }

        for(let i=1; i<=rating; i++) {
            var element = document.getElementById(star_number.substring(0, star_number.length - 1) + i);
            element.classList.add("clicked");
        }
    }
}