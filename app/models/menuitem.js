import Model, { attr } from '@ember-data/model';

export default class MenuitemModel extends Model {
    @attr id;
    @attr menu_category_id;
    @attr name;
    @attr description;
    @attr price;
    @attr created_at;
    @attr updated_at;
}
