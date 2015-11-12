import Ember from 'ember';

function locationName(locationId, locations) {
	var locationName = locations.findBy('idInt', parseInt(locationId));
	if (locationName) {
		return locationName.get("nameSv");
	}
	else {
		return "missing status: " + locationId;
	}
}	

export {
  locationName
};

export default Ember.Handlebars.makeBoundHelper(locationName);
