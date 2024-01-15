import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from '../config/environment';

export default class SignupController extends Controller {
    @tracked first_name = '';
    @tracked last_name = '';
    @tracked email = '';
    @tracked password = '';
    @tracked invalid_firstname = false;
    @tracked invalid_email = false;
    @tracked invalid_password = false;
    @tracked is_emailregistered = false;

    @action
    async createuser() {
        let valid_input = true;
        this.invalid_firstname = false;
        this.invalid_email = false;
        this.invalid_password = false;
        this.is_emailregistered = false;

        //validation of fields
        if(this.first_name.trim() == "") {
            this.invalid_firstname = true;
            valid_input = false;
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(this.email).match(mailformat))
        {
            this.invalid_email = true;
            valid_input = false;
        }
        if(this.password.trim().length < 6) {
            this.invalid_password = true;
            valid_input = false
        }

        //if all fields are valid then send a request to create a user
        if(valid_input) {
            const user = {
                first_name: this.first_name.trim(),
                last_name: this.last_name.trim(),
                email: this.email.trim(),
                role: "customer",
                password: this.password.trim()
            }
            const url = config.APP.URL;
            const response = await fetch(url + '/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
            });
          console.log(response.statusText);
            if (response.statusText == "Created") {
                this.transitionToRoute('signin');
            } else {
                this.is_emailregistered = true;
            }
        }
    }
}
