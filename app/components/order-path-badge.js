import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'span',
  classNames: ['label'],
  classNameBindings: ['isLibris:label-info:label-default'],

  isLibris: Ember.computed.equal('orderPath', 'LibrisEnduser'),

  orderPathString: Ember.computed(function() {

    switch (this.get('orderPath')) {
      case 'Web':
      case 'web':
        return 'Web'
        break;
      case 'SFX':
        return 'SFX'
        break;
      case 'LibrisEnduser':
        return 'Libris';
        break;
      default:
        return 'n/a'
        break;
    }

  })

});
