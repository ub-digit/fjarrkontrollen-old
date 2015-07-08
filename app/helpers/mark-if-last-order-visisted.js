import Ember from 'ember';

function markIfLastOrderVisited(latestOrderViewedId, id) {
	if (latestOrderViewedId === id) {
		return new Ember.Handlebars.SafeString("success");
	}
}	

export {
  markIfLastOrderVisited
};

export default Ember.Handlebars.makeBoundHelper(markIfLastOrderVisited);


