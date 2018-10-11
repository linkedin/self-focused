react-self-focused
==============================================================================

Making React Applications’ UI Transitions Screen Reader Friendly.

When UI transitions happen in a SPA (or in any dynamic web application), there is visual feedback; however, for users of screen reading software, there is no spoken feedback by default. Traditionally, screen reading software automatically reads out the content of a web page during page load or page refresh. In single page applications, the UI transitions happen by rewriting the current page, rather than loading entirely new pages from a server; this makes it difficult for screen reading software users to be aware of UI changes (e.g., clicking on the navigation bar to load a new route).

If the corresponding HTML node of the dynamic content can be focused programmatically, screen reading software will start speaking the textual content of that node. Focusing the corresponding HTML node of the dynamic content can be considered guided focus management. Not only will it facilitate the announcement of the textual content of the focused HTML node, but it will also serve as a guided context switch. Any subsequent “tab” key press will focus the next focusable element within/after this context.
However, keeping track of the HTML nodes to be focused can be tedious, repetitive, and error-prone since there could be hundreds of nodes that need to be programmatically focused in a SPA.

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

Implementation overview
------------------------------------------------------------------------------

- `self-focused` component on initial render invokes the `componentDidMount` and on re-render invokes the `componentDidUpdate` method of the `focus-manager` respectively passing the self HTML node as argument .
- `focus-manager` carries out the functionality of focusing the desired node.
  - `focus-manager` utilizes two state variables, namely `isFirstRender` and `nodeToBeFocused`.
    - initial value of the `isFirstRender` is set to `true`
    - initial value of the `nodeToBeFocused` is set to `null`
  - `focus-manager` on initialization schedules `isFirstRender` to be set to `false`in the with `requestAnimationFrame()`.
  - `focus-manager` has two private methods namely `setFocus` and `removeTabIndex`.
    - `setFocus` method
      - adds `tabindex=-1` to the `nodeToBeFocused`
      - invokes native `focus()` method on it
      - attaches `removeTabIndex` method to the `nodeToBeFocused` as the `click` and `blur` event handler
      - sets `nodeToBeFocused` to `null`
    - `removeTabIndex` method, removes the `tabindex`, `click` and `blur` event handlers from `nodeToBeFocused`
  - `focus-manager` exposes two methods, namely `componentDidMount` and `componentDidUpdate`, which are consumed by `self-focused` component.
    - `componentDidMount` and `componentDidUpdate` both accept a HTML node as an argument.
    - `componentDidMount` and `componentDidUpdate` both bail out if `isFirstRender` is true.
    - for `componentDidMount` the very last `self-focused` div passed to it for the render cycle wins
    - for `componentDidUpdate` the very first `self-focused` div passed to `componentDidMount` for the render cycle wins, if and only if `nodeToBeFocused` was null when this method was invoked.
    - `componentDidMount` and `componentDidUpdate` both schedule the private `setFocus` method, in the `afterRender` queue after if `nodeToBeFocused` was updated.

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
