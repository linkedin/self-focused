
<img src="logo/black-on-transparent.png" style="max-width: 100%" alt="">

self-focused
==============================================================================

When UI transitions happen in a SPA (or in any dynamic web application), there is visual feedback; however, for users of screen reading software, there is no spoken feedback by default. Traditionally, screen reading software automatically reads out the content of a web page during page load or page refresh. In single page applications, the UI transitions happen by rewriting the current page, rather than loading entirely new pages from a server; this makes it difficult for screen reading software users to be aware of UI changes (e.g., clicking on the navigation bar to load a new route).

If the corresponding HTML node of the dynamic content can be focused programmatically, screen reading software will start speaking the textual content of that node. Focusing the corresponding HTML node of the dynamic content can be considered guided focus management. Not only will it facilitate the announcement of the textual content of the focused HTML node, but it will also serve as a guided context switch. Any subsequent “tab” key press will focus the next focusable element within/after this context.
However, keeping track of the HTML nodes to be focused can be tedious, repetitive, and error-prone since there could be hundreds of nodes that need to be programmatically focused in a SPA.

For ember and react applications, this component solves the problem.

Usage
------------------------------------------------------------------------------

- [ember-self-focused](packages/ember-self-focused/README.md)
- [react-self-focused](packages/react-self-focused/README.md)

Contributing
------------------------------------------------------------------------------

Please refer [CONTRIBUTING.md](CONTRIBUTING.md)

License
------------------------------------------------------------------------------

This project is licensed under the [BSD-2-Clause License](LICENSE).
