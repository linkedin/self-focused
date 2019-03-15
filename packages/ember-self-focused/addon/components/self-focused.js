import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from '../templates/components/self-focused';

export default Component.extend({
  layout,
  fastboot: service(),
  focusManager: service(),
  classNames: ['self-focused'],

  isFastBoot: computed.reads('fastboot.isFastBoot'),

  init() {
    this._super(...arguments);
    this.get('focusManager').updateIsFirstRender();
  },

  didInsertElement() {
    this._super(...arguments);
    this.get('focusManager').setNodeToBeFocused(this.element, 'insert');
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
    if (!this.get('isFastBoot') && this.element) {
      this.get('focusManager').setNodeToBeFocused(this.element, 'attr');
    }
  }
});
