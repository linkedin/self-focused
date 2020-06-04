import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../templates/components/self-focused';

export default Component.extend({
  layout,
  focusManager: service('focus-manager'),
  classNames: ['self-focused'],

  didInsertElement() {
    this._super(...arguments);
    this.get('focusManager').didInsertElement(this.element);
  },

  didRender() {
    this._super(...arguments);
    this.get('focusManager').didRenderElement(this.element);
  }
});
