import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('posts', function(){
    this.resource('post', {path: ':post_id'});
  });

});

export default Router;
