self-focused
==============================================================================

Helps make a single page application more friendly to screen readers.

The screen reader reads out the content of a web page on load or page refresh.
In Single Page Application (SPA) there is no page refresh after the initial page load, the UI gets updated without page refresh, which makes it difficult for a screen reader user to be aware of the UI change.
However, if the container of the dynamic content can be focused, the screen reader will start reading out the content of the focused container.

Focusing the content of the dynamic container can be a tedious and repeated job.

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
