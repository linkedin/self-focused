import { run } from '@ember/runloop';
import Service from '@ember/service';

/**
 * Focus manager service
 * This service is intended to be used by self-focused component
 */

export default Service.extend({

  init() {
    this._super(...arguments);

    /**
    * @property {boolean} _isFirstRender - determines whether it is a first render
    * @private
    */
    this._isFirstRender = true;

    /**
     * @property {HTMLNode} _nodeToBeFocused - node to be focused
     * @private
     */
    this._nodeToBeFocused = null;

    /**
     * this bound _removeTabIndex
     * @private
     */
    this._removeTabIndex = this._removeTabIndex.bind(this);
  },

  /**
   * Use this method to set the node to be focused.
   * It will be focused if no node has already been set and is not the first render.
   *
   * @param {HTMLNode} node - node to be focused
   */
  nominateNodeToBeFocused(node, type) {
    if (this._isFirstRender) {
      return;
    }
    // the render order starts from the child most to the top most
    // thus
    // if type is insert: focus the top most inserted self-focused div
    // the very last self-focused div passed to this method for this render cycle wins
    if (type === 'insert') {
      this._nodeToBeFocused = node;
      run.scheduleOnce('afterRender', this, this._setFocus);
      return;
    }
    // the render order starts from the child most to the top most
    // thus
    // if the type is not insert: focus the child most updated self-focused div
    // the very first self-focused div passed to this method for this render cycle wins
    if (this._nodeToBeFocused) {
      return;
    }
    this._nodeToBeFocused = node;
    run.scheduleOnce('afterRender', this, this._setFocus);
  },

  /**
   * Use this method to set _isFirstRender to false.
   */
  updateIsFirstRender() {
    if (this._isFirstRender) {
      run.scheduleOnce('afterRender', this, this.set, '_isFirstRender', false);
    }
  },

  /**
   * if _nodeToBeFocused has been set
   * then
   * add tabindex=-1 to the node
   * focus the node
   * attach _removeTabIndex as an eventListener to the node
   * update the _nodeToBeFocused to `null`
   */
  _setFocus() {
    const node = this._nodeToBeFocused;
    if (node) {
      // save current scroll position so setting focus does not
      // disrupt the user's placement on the page
      const scrollX = window.pageXOffset;
      const scrollY = window.pageYOffset;
      node.setAttribute('tabindex', '-1');
      node.focus();
      // after setting focus, scroll back to the place where the user was previously
      window.scrollTo(scrollX, scrollY);
      // mouse click on a element with tabindex=-1 focues the element
      // thus removing the tabindex on blur or click
      node.addEventListener('blur', this._removeTabIndex);
      node.addEventListener('click', this._removeTabIndex);
      this._nodeToBeFocused = null;
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
