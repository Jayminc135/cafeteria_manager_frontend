import Model, { attr } from '@ember-data/model';

export default class MenucategoryModel extends Model {
    @attr id;
    @attr name;
    @attr created_at;
    @attr updated_at;
}
