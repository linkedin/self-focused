import raf from 'raf';
/**
 * Focus manager
 * This is intended to be used by self-focus component
 */
class FocusManager {
  constructor() {
    if (!FocusManager.instance) {
      /**
       * @property {boolean} isFirstRender - determines whether it is a first render
       * @private
       */
      let isFirstRender = true;

      /**
       * @property {HTMLNode} nodeToBeFocused - node to be focused
       * @private
       */
      let nodeToBeFocused = null;

      /**
       * Remove tabindex attribute, blur and click eventlistener
       * from the node
       * @param {Object} e - event object
       */
      const removeTabIndex = function (e) {
        e.currentTarget.removeAttribute('tabindex');
        e.currentTarget.removeEventListener('blur', removeTabIndex);
        e.currentTarget.removeEventListener('click', removeTabIndex);
      };

      /**
       * If nodeToBeFocused has been set
       * then
       * add tabindex=-1 to the node
       * focus the node
       * attach _removeTabIndex as an eventListener to the node
       * update the nodeToBeFocused to `null`
       */
      const setFocus = function () {
        raf(() => {
          if (nodeToBeFocused) {
            // Save current scroll position so setting focus does not
            // disrupt the user's placement on the page
            const scrollX = window.pageXOffset;
            const scrollY = window.pageYOffset;
            nodeToBeFocused.setAttribute('tabindex', '-1');
            nodeToBeFocused.focus();
            // After setting focus, scroll back to the place where the user was previously
            window.scrollTo(scrollX, scrollY);
            // Mouse click on a element with tabindex=-1 focues the element
            // thus removing the tabindex on blur or click
            nodeToBeFocused.addEventListener('blur', removeTabIndex);
            nodeToBeFocused.addEventListener('click', removeTabIndex);
            nodeToBeFocused = null;
          }
        });
      };

      /**
       * Use this method to set isFirstRender to false.
       */
      this.updateIsFirstRender = function () {
        if (isFirstRender) {
          raf(() => {
            isFirstRender = false;
          });
        }
      };

      /**
       * Use this method to set the node to be focused.
       * It will be focused if no node has already been set and is not the first render.
       *
       * @param {HTMLNode} node - node to be focused
       * @param {string} type - type of operation mount/update
       */
      this.nominateNodeToBeFocused = function (node, type) {
        if (isFirstRender) {
          return;
        }
        // The render order starts from the child most to the top most
        // thus
        // if type is mount: focus the top most inserted self-focused div
        // the very last self-focused div passed to this method for this render cycle wins
        if (type === 'mount') {
          nodeToBeFocused = node;
          setFocus();
          return;
        }
        // The render order starts from the child most to the top most
        // thus
        // if the type is not mount: focus the child most updated self-focused div
        // the very first self-focused div passed to this method for this render cycle wins
        if (nodeToBeFocused) {
          return;
        }
        nodeToBeFocused = node;
        setFocus();
      };

      FocusManager.instance = this;
    }
    return FocusManager.instance;
  }
}

export default FocusManager;
