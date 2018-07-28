import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../templates/components/self-focused';

export default Component.extend({
  layout,
  focusManager: service(),
  classNames: ['self-focused'],

  init() {
    this._super(...arguments);
    this.get('focusManager').updateIsFirstRender();
  },

  didInsertElement() {
    this._super(...arguments);
    this.get('focusManager').nominateNodeToBeFocused(this.element, 'insert');
  },

  didRender() {
    this._super(...arguments);
    this.get('focusManager').nominateNodeToBeFocused(this.element);
  }
});
