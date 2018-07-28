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

  /**
   * although the content of didReceiveAttrs is almost same as didInsertElement
   * it is required for scenarios when render happens due to attribute/model changes
   * didInsertElement will not be invoked in such scenario
   */
  didReceiveAttrs() {
    this._super(...arguments);
    /**
     * the if condition is required as didReceiveAttrs is executed before didInsertElement
     * and for the very first invocation, the corresponding element is not available
     * as it is yet to be inserted in the DOM
     */
    if (this.element) {
      this.get('focusManager').nominateNodeToBeFocused(this.element);
    }
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
