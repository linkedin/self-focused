import { module, test } from 'qunit';
import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | self focused', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting the same route focuses the desired HTML node - home', async function(assert) {
    await visit('/');

    await click('[href');
    assert.equal(document.activeElement, document.querySelector('.home'));

    await click('[href');
    assert.equal(document.activeElement, document.querySelector('.home'));

    await click('[href');
    assert.equal(document.activeElement, document.querySelector('.home'));
  });

  test('visiting the same route focuses the desired HTML node - about', async function(assert) {
    await visit('/');

    await click('[href$=about');
    assert.equal(document.activeElement, document.querySelector('.about'));

    await click('[href$=about');
    assert.equal(document.activeElement, document.querySelector('.about'));

    await click('[href$=about');
    assert.equal(document.activeElement, document.querySelector('.about'));
  });

  test('visiting the same route focuses the desired HTML node - topics', async function(assert) {
    await visit('/');

    await click('[href$=topics');
    assert.equal(document.activeElement, document.querySelector('.topics'));

    await click('[href$=topics');
    assert.equal(document.activeElement, document.querySelector('.topics'));

    await click('[href$=topics');
    assert.equal(document.activeElement, document.querySelector('.topics'));
  });

  test('visiting the same route focuses the desired HTML node - topics/component', async function(assert) {
    await visit('/topics');

    await click('[href$=component');
    assert.equal(document.activeElement, document.querySelector('.topic'));

    await click('[href$=component');
    assert.equal(document.activeElement, document.querySelector('.topic'));

    await click('[href$=component');
    assert.equal(document.activeElement, document.querySelector('.topic'));
  });

  test('visiting the same route focuses the desired HTML node - topics/router', async function(assert) {
    await visit('/topics');

    await click('[href$=router');
    assert.equal(document.activeElement, document.querySelector('.topic'));

    await click('[href$=router');
    assert.equal(document.activeElement, document.querySelector('.topic'));

    await click('[href$=router');
    assert.equal(document.activeElement, document.querySelector('.topic'));
  });
});
