import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | orders', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:orders');
    assert.ok(controller);

    //controller.send('fetchitems',16,'pending delivery',1);

    //assert.equal(controller.total,0,'total is 0');
    assert.equal(controller.isorderpending, false, 'isorderpending is false');
    assert.equal(controller.username, '', 'username initialised');
  });
});
