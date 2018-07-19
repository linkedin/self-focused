react-self-focused
==============================================================================

Helps make a react (single page) application more friendly to screen readers.

The screen reader reads out the content of a web page on load or page refresh.
In Single Page Application (SPA) there is no page refresh after the initial page load, the UI gets updated without page refresh, which makes it difficult for a screen reader user to be aware of the UI change.
However, if the container of the dynamic content can be focused, the screen reader will start reading out the content of the focused container.

Focusing the content of the dynamic container can be a tedious and repeated job.

For react applications, this component solves the problem.

![react-self-focused](../../gifs/react-self-focused.gif)

Installation
------------------------------------------------------------------------------

```
npm i react-self-focused -S
```

Usage
------------------------------------------------------------------------------

Wrap all the routable components by `self-focused`.

```js
import SelfFocused from 'react-self-focused';

<SelfFocused>
  <!-- block to be rendered -->
</SelfFocused>
```

Since the div will be focused, it will have a focus outline/highlight, if that is not desired, please add the following styles:

```css
.self-focused:focus {
  outline: none
}
```

Probably also add the following or similar styles:

```css
Add [`activeClassName="active"`](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/05-active-links#active-class-name) to all the `<Link>` component.

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
- `self-focused` component
  - on initialization invokes `updateIsFirstRender` method of the `focus-manager`.
  - on `componentDidMount` and `componentDidUpdate` invokes the `setNodeToBeFocused` method of the `focus-manager`, passing the self HTML node and the type of operation (`mount` or `update`) as the arguments.
- `focus-manager` carries out the functionality of focusing the desired node.
  - `focus-manager` utilizes two state variables, namely `isFirstRender` and `nodeToBeFocused`.
    - initial value of the `isFirstRender` is set to `true`
    - initial value of the `nodeToBeFocused` is set to `null`
  - `focus-manager` has two private methods namely `setFocus` and `removeTabIndex`.
    - `setFocus` method
      - adds `tabindex=-1` to the `nodeToBeFocused`
      - invokes native `focus()` method on it
      - attaches `removeTabIndex` method to the `nodeToBeFocused` as the `click` and `blur` event handler
      - sets `nodeToBeFocused` to `null`
    - `removeTabIndex` method, removes the `tabindex`, `click` and `blur` event handler from `nodeToBeFocused`
  - `focus-manager` exposes  two methods, namely `updateIsFirstRender` and `setNodeToBeFocused`, which are consumed by `self-focused` component.
    - `updateIsFirstRender` sets `isFirstRender` to `false` if it is not already.
    - `setNodeToBeFocused` method
      - accepts a HTML node and type as arguments.
      - verifies the state of `isFirstRender` and if `isFirstRender` is `true`, which is the case for very first invocation, it bails out.
      - if type is `mount` it updates `nodeToBeFocused` with the passed HTML node, and schedules the private `setFocus` method
      - if type is other than `mount` and `nodeToBeFocused` is not `null`, it bails out.
      - otherwise, it updates `nodeToBeFocused` with the passed HTML node, and schedules the private `setFocus` method, in the `afterRender` queue.

Contributing
------------------------------------------------------------------------------

### Running tests

* `npm t`

### Running the example application

* `npm start`
* Visit the example application at [http://localhost:8080](http://localhost:8080).

License
------------------------------------------------------------------------------

This project is licensed under the [BSD-2-Clause License](LICENSE).
