import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
    @attr first_name;
    @attr last_name;
    @attr email;
    @attr role;
    @attr password;
}
