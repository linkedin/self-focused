import { run } from '@ember/runloop';
import Service from '@ember/service';

/**
 * Focus manager service
 * This service is intended to be used by self-focused component
 */

export default Service.extend({
  /**
   * @property {boolean} isFirstRender - determines whether it is a first render
   * @private
   */
  isFirstRender: true,

  /**
   * @property {HTMLNode} nodeToBeFocused - node to be focused
   * @private
   */
  nodeToBeFocused: null,

  init() {
    this._super(...arguments);
    this._removeTabIndex = this._removeTabIndex.bind(this);
  },

  /**
   * Use this method to set the node to be focused.
   * It will be focused if no node has already been set and is not the first render.
   *
   * @param {HTMLNode} node - node to be focused
   */
  setNodeToBeFocused(node) {
    if (this.get('isFirstRender')) {
      return;
    }

    if (!this.get('nodeToBeFocused')) {
      this.set('nodeToBeFocused', node);
    }

    run.scheduleOnce('afterRender', this, this._setFocus);
  },

  /**
   * Use this method to set isFirstRender to false.
   */
  updateIsFirstRender() {
    if(this.get('isFirstRender')) {
      run.scheduleOnce('afterRender', this, function() {
        this.set('isFirstRender', false);
      });
    }
  },

  /**
   * if nodeToBeFocused has been set
   * then
   * add tabindex=-1 to the node
   * focus the node
   * attach _removeTabIndex as an eventListener to the node
   * update the nodeToBeFocused to `null`
   */
  _setFocus() {
    const node = this.get('nodeToBeFocused');
    if (node) {
      node.setAttribute('tabindex', '-1');
      node.focus();
      // mouse click on a element with tabindex=-1 focues the element
      // thus removing the tabindex on blur or click
      node.addEventListener('blur', this._removeTabIndex);
      node.addEventListener('click', this._removeTabIndex);
      this.set('nodeToBeFocused', null);
    }
  },

  /**
   * remove tabindex attribute, blur and click eventlistener
   * from the node
   */
  _removeTabIndex(e) {
    e.currentTarget.removeAttribute('tabindex');
    e.currentTarget.removeEventListener('blur', this._removeTabIndex);
    e.currentTarget.removeEventListener('click', this._removeTabIndex);
  }
});
