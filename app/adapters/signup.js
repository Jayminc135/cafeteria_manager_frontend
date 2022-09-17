import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class SignupAdapter extends JSONAPIAdapter {
    host = 'http://localhost:3000'
    //namespace = 'http://localhost:3000';

    // buildURL(...args) {
    //     return `${super.buildURL(...args)}.json`;
    // }
}
