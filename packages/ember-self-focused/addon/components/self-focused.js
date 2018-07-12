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

  didRender() {
    this._super(...arguments);
    this.get('focusManager').setNodeToBeFocused(this.element);
  }
});
