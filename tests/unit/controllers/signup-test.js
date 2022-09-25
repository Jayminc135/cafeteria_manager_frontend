import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | signup', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {

    let controller = this.owner.lookup('controller:signup');
    assert.ok(controller);

    assert.equal(controller.first_name, '', 'first_name initialized');
    assert.equal(controller.last_name, '', 'last_name initialized');
    assert.equal(controller.email, '', 'email initialised');
    assert.equal(controller.password, '', 'password initialised');
    assert.equal(controller.invalid_firstname, false, 'invalid_firstname initialised');
    assert.equal(controller.invalid_email, false, 'invalid_email initialised');
    assert.equal(controller.invalid_password, false, 'invalid_password initialised');
    assert.equal(controller.is_emailregistered, false, 'is_emailregistered initialised');
    
    controller.first_name = 'Jatin';
    controller.last_name = 'Sapru'
    controller.email = 'jatin@gmail.com';
    controller.password = 'jatin@cricket';
    controller.send('createuser');

    assert.equal(controller.invalid_firstname, false, 'invalid_firstname is false');
    assert.equal(controller.invalid_email, false, 'invalid_email is false');
    assert.equal(controller.invalid_password, false, 'invalid_password is false');
    //assert.equal(controller.response.statusText, 'Created', 'user created');
  });
});
