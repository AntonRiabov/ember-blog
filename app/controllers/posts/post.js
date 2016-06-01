import Ember from 'ember';


export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    edit: function () {
      this.set('isEditing', true);
    },
    doneEditing: function () {
      var post = this.store.findRecord('post', this.get('model').get('id')).then(function(post){
        console.log('POST properties: ');
        console.log(' ' +  post.get('title'));
        console.log(' ' +  post.get('body'));
        console.log(' ' +  post.get('author'));
        post.set('title', 'blablab');
        post.save();
      });
     //
     //var post = this.store.createRecord('post', {
     //  author: null,
     //   title: 'Rails is Omakase',
     //   body: 'Lorem ipsum',
     //  date: new Date()
     // });
     // post.save();

      this.set('isEditing', false);
    }

  }
});
