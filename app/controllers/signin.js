import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from '../config/environment';

export default class SigninController extends Controller {
    @tracked email = '';
    @tracked password = '';
    not_authenticated = false;

    @action
    async signinuser() {
        const url = config.APP.URL;
        let response = await fetch(url + '/sessions?email=' + this.email + '&password=' + this.password);
        if(response.status == 200) {
            this.set("not_authenticated", false);
            let user = await response.json();
            localStorage.setItem("UserId", user.id);
            localStorage.setItem("UserName", user.first_name);
            localStorage.setItem("role", user.role);
            localStorage.setItem("IsAuthenticated", "true");
            this.transitionToRoute('menu');
        }
        else {
            this.set("not_authenticated", true);
        }
    }
}
