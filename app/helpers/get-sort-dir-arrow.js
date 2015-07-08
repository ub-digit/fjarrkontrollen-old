import Ember from 'ember';

function getSortDirArrow(value) {
	if (value === 'ASC') {
		return new Ember.Handlebars.SafeString(' <i class="fa fa-angle-down"></i>');
	}
	else {
		return new Ember.Handlebars.SafeString(' <i class="fa fa-angle-up"></i>');
	}  
}

export {
  getSortDirArrow
};

export default Ember.Handlebars.makeBoundHelper(getSortDirArrow);
