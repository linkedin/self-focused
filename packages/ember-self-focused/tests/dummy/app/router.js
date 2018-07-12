import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('about', { path: '/about' });
  this.route('topics', function() {
    this.route('topic', { path: '/:topicId' }); // eslint-disable-line
  });
});

export default Router;
