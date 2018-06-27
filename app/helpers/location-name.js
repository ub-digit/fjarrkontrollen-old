import Ember from 'ember';

function locationName(locationId, locations) {
	var name = locations.findBy('idInt', parseInt(locationId));
	if (name) {
		return name.get("nameSv");
	}
	else {
		return "missing status: " + locationId;
	}
}

export {
  locationName
};

export default Ember.Handlebars.makeBoundHelper(locationName);
