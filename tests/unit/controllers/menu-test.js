import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | menu', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:menu');
    assert.ok(controller);

    controller.category_name = 'test';
    controller.send('saveCategory');

    controller.item_name = '';
    controller.price = '100';
    controller.send('saveItem');

    assert.equal(controller.empty_categoryname, false, 'empty_categoryname is false');
    assert.equal(controller.empty_itemname, true, 'empty_itemname is true');
    assert.equal(controller.empty_itemprice, false, 'empty_itemprice is false');
  });
});
