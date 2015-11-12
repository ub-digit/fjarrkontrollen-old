import Ember from 'ember';

function sourceName(sourceId, deliverySources) {
 	//var applicationController = this.get("controllers.application");
	var deliverySource = deliverySources.findBy('idInt', parseInt(sourceId));
	if (deliverySource) {
		return deliverySource.get("name");
	}
	else {
		return "missing status: " + sourceId;
	}
}	

export {
  sourceName
};

export default Ember.Handlebars.makeBoundHelper(sourceName);
