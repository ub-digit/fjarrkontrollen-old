import DS from 'ember-data';

export default DS.Model.extend({
  	label: 	DS.attr('string'),
  	name: 	DS.attr('string'),
	isActive: 	DS.attr('boolean'),
});

