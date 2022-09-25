import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | signin', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:signin');
    assert.ok(controller);

    // this.set('email', 'apple@gmail.com')
    // this.set('password', '123456');
    controller.email = 'apple@gmail.com';
    controller.password = '123456';

    //controller.send('signinuser');

    assert.equal(controller.not_authenticated, false, 'not_authenticated is initialised');
    
  });
});
