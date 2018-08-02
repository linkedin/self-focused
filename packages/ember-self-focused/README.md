ember-self-focused
==============================================================================

Helps make a ember (single page) application more friendly to screen readers.

The screen reader reads out the content of a web page on load or page refresh.
In Single Page Application (SPA) there is no page refresh after the initial page load, the UI gets updated without page refresh, which makes it difficult for a screen reader user to be aware of the UI change.
However, if the container of the dynamic content can be focused, the screen reader will start reading out the content of the focused container.

Focusing the content of the dynamic container can be a tedious and repeated job.

For ember applications, this addon solves the problem.

![ember-self-focused](../../gifs/ember-self-focused.gif)

Installation
------------------------------------------------------------------------------

```
ember install ember-self-focused
```

Usage
------------------------------------------------------------------------------

Add the `self-focused` component to all the desired templates/component corresponding to the routes.
```html
{{#self-focused}}
  <!-- html block to be yielded -->
{{/self-focused}}
```

Since the div will be focused, it will have a focus outline/highlight, if that is not desired, please add the following styles:

```css
.self-focused:focus {
  outline: none
}
```

Probably also add the following or similar styles:

```css
// following will serve as a visual hint for currently active link to the sighted users
a.active {
  background: #000000;
  color: #ffffff;
}
// following will serve as a visual hint for currently active link to the sighted users
a.active after {
  content: 'Currently active link.';
  font-size: 0;
}
```

Implementation overview
------------------------------------------------------------------------------

- `self-focused` component on initial render invokes the `didInsertElement` and on re-render invokes the `didRenderElement` method of the `focus-manager` respectively passing the self HTML node as argument .
- `focus-manager` service carries out the functionality of focusing the desired node.
  - `focus-manager` utilizes two state variables, namely `_isFirstRender` and `_nodeToBeFocused`.
    - initial value of the `_isFirstRender` is set to `true`
    - initial value of the `_nodeToBeFocused` is set to `null`
  - `focus-manager` on initialization schedules `_isFirstRender` to be set to `false`in the `afterRender` queue.
  - `focus-manager` has two private methods namely `_setFocus` and `_removeTabIndex`.
    - `_setFocus` method
      - adds `tabindex=-1` to the `nodeToBeFocused`
      - invokes native `focus()` method on it
      - attaches `_removeTabIndex` method to the `_nodeToBeFocused` as the `click` and `blur` event handler
      - sets `_nodeToBeFocused` to `null`
    - `_removeTabIndex` method, removes the `tabindex`, `click` and `blur` event handlers from `nodeToBeFocused`
  - `focus-manager` service exposes two methods, namely `didInsertElement` and `didRenderElement`, which are consumed by `self-focused` component.
    - `didInsertElement` and `didRenderElement` both accept a HTML node as an argument.
    - `didInsertElement` and `didRenderElement` both bail out if `_isFirstRender` is true.
    - for `didInsertElement` the very last `self-focused` div passed to it for the render cycle wins
    - for `didRenderElement` the very first `self-focused` div passed to `didInsertElement` for the render cycle wins, if and only if `_nodeToBeFocused` was null when this method was invoked.
    - `didInsertElement` and `didRenderElement` both schedule the private `setFocus` method, in the `afterRender` queue after if `_nodeToBeFocused` was updated.

Contributing
------------------------------------------------------------------------------

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

License
------------------------------------------------------------------------------

This project is licensed under the [BSD-2-Clause License](LICENSE).
