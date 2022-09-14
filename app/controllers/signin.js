import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SigninController extends Controller {
    @tracked email = '';
    @tracked password = '';

    @action
    async signinuser() {
        const user = {
            email: this.email,
            password: this.password
        }
        const response = await fetch('http://localhost:3000/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
        });
        if (response.ok) {
            console.log("Verified");
        } else {
            console.log("Not verified");
        }
    }
}
