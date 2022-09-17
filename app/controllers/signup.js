import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from '../config/environment';

export default class SignupController extends Controller {
    @tracked first_name = '';
    @tracked last_name = '';
    @tracked email = '';
    @tracked password = '';

    @action
    async createuser() {
        const user = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: "customer",
            password: this.password
        }
        const url = config.APP.URL;
        const response = await fetch(url + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
        });
        console.log(response);
        if (response.statusText == "Created") {
            console.log("Created");
            this.transitionToRoute('signin');
        } else {
            console.log("Not Created");
        }
    }
}
