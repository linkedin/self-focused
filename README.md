self-focused
==============================================================================

Make an single page application screen reader friendly.

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

### Installation

* `git clone git@gitli.corp.linkedin.com:sarbbottam/self-focused.git`
* `cd self-focused`
* `npm i`
* `npm run bootstrap`


### Running tests for all the packages

* `npm test`

### Running the dummy/example application in all the packages

* `npm start`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).
* Visit the example application at [http://localhost:8080](http://localhost:8080).

### Running tests

* `npm t`

### Running the example application

* `npm start`
* Visit the example application at [http://localhost:8080](http://localhost:8080).

License
------------------------------------------------------------------------------

This project is licensed under the [BSD-2-Clause License](LICENSE).
