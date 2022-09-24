import Route from '@ember/routing/route';

export default class SignoutRoute extends Route {
    beforeModel() {
        localStorage.setItem("UserId", '');
        localStorage.setItem("UserName", '');
        localStorage.setItem("role", '');
        localStorage.setItem("IsAuthenticated", "false");
        this.transitionTo('signup');
    }
}
