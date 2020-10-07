import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | self-focused', function(hooks) {
  setupRenderingTest(hooks);

  test('it should not focus the self-focused div for the very first render', async function(assert) {
    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    let selfFocusedDiv = this.element.querySelector('#container > div');
    assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');
    assert.equal(document.body, document.activeElement, 'document.body is the currently focused element');
  });

  test('it should focus the self-focused div for any subsequent render', async function(assert) {
    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    let selfFocusedDiv = this.element.querySelector('#container > div');
    assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');

    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    selfFocusedDiv = this.element.querySelector('#container > div');

    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> is the currently focused element');
  });

  test('it should remove the tabindex property when self-focused <div> blurs', async function(assert) {
    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    let selfFocusedDiv = this.element.querySelector('#container > div');
    assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');

    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    selfFocusedDiv = this.element.querySelector('#container > div');

    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> is the currently focused element');

    selfFocusedDiv.addEventListener('click', () => {
      assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');
      assert.equal(document.body, document.activeElement, 'document.body is the currently focused element');
    })
    selfFocusedDiv.blur();
  });

  test('it should remove the tabindex property when self-focused <div> is clicked', async function(assert) {
    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    let selfFocusedDiv = this.element.querySelector('#container > div');
    assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');

    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    selfFocusedDiv = this.element.querySelector('#container > div');

    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> is the currently focused element');

    selfFocusedDiv.addEventListener('click', () => {
      assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');
      assert.equal(document.body, document.activeElement, 'document.body is the currently focused element');
    })
    selfFocusedDiv.click();
  });

  test('it should focus the top most self-focused div on initial render', async function(assert) {
    await render(hbs`
      <div id="container">
        {{#self-focused}}
          template block text
        {{/self-focused}}
      </div>
    `);

    let selfFocusedDiv = this.element.querySelector('#container > div');
    assert.notOk(selfFocusedDiv.getAttribute('tabindex'), 'self-focused <div> does not have a tabindex property');
    assert.equal(document.body, document.activeElement, 'document.body is the currently focused element');

    await render(hbs`
      <div id="container">
        {{#self-focused class="one"}}
          {{#self-focused class="two"}}
            {{#self-focused class="three"}}
              template block text
            {{/self-focused}}
          {{/self-focused}}
        {{/self-focused}}
      </div>
    `);

    selfFocusedDiv = this.element.querySelector('#container .one');
    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> one has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> one is the currently focused element');
  });

  test('it should focus the child most self-focused div on re-render', async function(assert) {
    this.set('one', null);
    this.set('two', null);
    this.set('three', null);

    await render(hbs`
      <div id="container">
        {{#self-focused class="one" one=one}}
          {{#self-focused class="two" two=two}}
            {{#self-focused class="three" three=three}}
              template block text
            {{/self-focused}}
          {{/self-focused}}
        {{/self-focused}}
      </div>
    `);

    this.set('one', 'foo');
    await settled();
    let selfFocusedDiv = this.element.querySelector('#container .one');
    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> one has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> one is the currently focused element');

    this.set('two', 'foo');
    await settled();
    selfFocusedDiv = this.element.querySelector('#container .two');
    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> two has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> two is the currently focused element');

    this.set('three', 'foo');
    await settled();
    selfFocusedDiv = this.element.querySelector('#container .three');
    assert.equal(selfFocusedDiv.getAttribute('tabindex'), '-1', 'self-focused <div> three has a tabindex property with value -1');
    assert.equal(selfFocusedDiv, document.activeElement, 'self-focused <div> three is the currently focused element');
  });
});
